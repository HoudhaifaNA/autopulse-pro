import fs from "fs";
import path from "path";

import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

import db from "../database";
import * as S from "../statments/licencesStatments";
import { insertTransactionStatment, updateTransactionByProductIdStatment } from "../statments/transactionsStatments";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";
import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";
import { Licence, Procuration } from "../../interfaces";

interface ITotalCount {
  total_count: number;
}

const uid = () => {
  return `${Math.random().toString(36).slice(2)}`;
};

export const getLicencesList = tryCatch((req, res) => {
  const { id } = req.query;

  let filterClause = "WHERE is_valid = 1";
  let currentLicence;

  if (id) {
    currentLicence = S.selectLicenceByIdStatment.get(id) as Licence;
  }

  const selectLicencesListQuery = `
  ${S.selectLicencesListQuery}
  ${filterClause}
  `;

  const licences = db.prepare(selectLicencesListQuery).all() as Licence[];
  if (currentLicence) licences.push(currentLicence);

  return res.status(200).json({ status: "success", results: licences.length, licences });
});

export const getAllLicences = tryCatch((req, res) => {
  const { is_valid, is_expirated, is_reserved, orderBy = "-purchased_at", page = 1, limit = 250 } = req.query;

  const ranges = ["purchased_at", "issue_date", "price"];
  const skip = (Number(page) - 1) * Number(limit);

  const filterQueries = generateRangeFilters(ranges, req.query, "licences");

  if (is_valid) {
    const isValidValue = is_valid === "true" ? 1 : 0;
    const isValidFilter = `is_valid = ${isValidValue}`;
    filterQueries.push(isValidFilter);
  }

  if (is_reserved) {
    const isReservedValue = is_reserved === "true" ? 1 : 0;
    const isReservedFilter = `is_reserved = ${isReservedValue}`;
    filterQueries.push(isReservedFilter);
  }

  if (is_expirated) {
    const isExpiratedValue = is_expirated === "true" ? 1 : 0;
    const isExpiratedFilter = `is_expirated = ${isExpiratedValue}`;
    filterQueries.push(isExpiratedFilter);
  }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  const selectLicencesQuery = `
    ${S.selectLicencesQuery}
    ${filterClause}
    ${orderByQuery}
    LIMIT ? OFFSET ?
  `;

  const selectLicencesCountQuery = `
    SELECT
    ${S.IS_LICENCE_VALID},
    ${S.IS_LICENCE_EXPIRATED},
    COUNT(*) AS total_count
    FROM licences
    ${filterClause}
   `;

  const licences = db.prepare(selectLicencesQuery).all([limit, skip]);
  const { total_count } = db.prepare(selectLicencesCountQuery).get() as ITotalCount;

  return res.status(200).json({
    status: "success",
    results: total_count,
    records_in_page: licences.length,
    licences,
  });
});

export const getLicenceById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const licence = S.selectLicenceByIdStatment.get(id);

  if (!licence) {
    return next(new AppError("Licence non trouvée.", 404));
  }

  return res.status(200).json({ status: "success", licence });
});

export const createLicence = tryCatch((req, res, next) => {
  const { purchased_at, moudjahid, seller_id, wilaya, serial_number, price, issue_date, note } = req.body;
  const files = req.files as Express.Multer.File[];
  const attachments: string[] = [];

  db.exec("BEGIN TRANSACTION");
  try {
    const sameLicence = S.selectLicenceByMoudjahidStatment.get([moudjahid?.toLowerCase(), serial_number]);

    if (sameLicence) {
      db.exec("ROLLBACK;");
      return next(
        new AppError("Une licence non expirée existe déjà avec le même nom et le même numéro de série.", 403)
      );
    }

    if (files.length > 0) {
      files.forEach(({ fieldname, mimetype }) => {
        const fileExtension = mimetype.split("/")[1];
        attachments.push(`${fieldname}-${uid()}-${Date.now()}.${fileExtension}`);
      });
    }

    const params = {
      purchased_at,
      moudjahid: moudjahid.toLowerCase(),
      seller_id,
      wilaya,
      serial_number,
      price,
      attachments: JSON.stringify(attachments),
      issue_date,
      note,
    };

    const { lastInsertRowid } = S.insertLicenceStatment.run(params);

    const transacrtionParams = {
      client_id: seller_id,
      transaction_date: purchased_at,
      type: "licence",
      product_id: lastInsertRowid,
      info1: "licence",
      info2: moudjahid.toLowerCase(),
      info3: wilaya,
      info4: serial_number,
      direction: "entrante",
      currency: "DZD",
      amount: price,
      recipient: "company",
      note,
    };

    insertTransactionStatment.run(transacrtionParams);

    try {
      files.forEach((file, i) => {
        let folderPath = "uploads";
        if (process.env.NODE_ENV === "production") {
          folderPath = "resources/uploads";
        }

        const filePath = path.join(path.resolve(), folderPath, attachments[i]);

        fs.writeFileSync(filePath, file.buffer);
      });
    } catch (error) {
      db.exec("ROLLBACK;");
      return next(new AppError(`Une erreur s'est produite lors de l'enregistrement des pièces jointes. `, 403));
    }

    const newLicence = S.selectLicenceByIdStatment.get(lastInsertRowid);
    db.exec("COMMIT;");

    res.status(201).json({ status: "success", licence: newLicence });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const updateLicence = tryCatch((req, res, next) => {
  const { purchased_at, moudjahid, seller_id, wilaya, serial_number, price, issue_date, note } = req.body;
  const { id } = req.params;

  db.exec("BEGIN TRANSACTION");
  try {
    const sameLicence = S.selectLicenceByMoudjahidStatment.get([moudjahid?.toLowerCase(), serial_number]) as
      | Licence
      | undefined;

    if (sameLicence && String(sameLicence.id) !== id) {
      db.exec("ROLLBACK;");
      return next(
        new AppError("Une licence non expirée existe déjà avec le même nom et le même numéro de série.", 403)
      );
    }

    const params = [
      purchased_at,
      moudjahid?.toLowerCase(),
      seller_id,
      wilaya,
      serial_number,
      price,
      issue_date,
      note,
      id,
    ];

    const { changes } = S.updateLicenceStatment.run(params);

    if (!changes) {
      db.exec("ROLLBACK;");
      return next(new AppError("Licence non trouvée.", 404));
    }

    const productParams = ["licence", id, "entrante"];

    const transacrtionParams = [
      seller_id,
      purchased_at,
      "licence",
      moudjahid.toLowerCase(),
      wilaya,
      serial_number,
      "entrante",
      "DZD",
      price,
      "company",
      note,
    ];

    updateTransactionByProductIdStatment.run([...transacrtionParams, ...productParams]);

    const updatedLicence = S.selectLicenceByIdStatment.get(id) as Licence;

    db.exec("COMMIT;");

    res.status(200).json({ status: "success", licence: updatedLicence });
  } catch (error: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(error, 403));
  }
});

export const reserveLicence = tryCatch((req, res, next) => {
  const { is_reserved } = req.body;
  const { id } = req.params;
  const licence = S.selectLicenceByIdStatment.get(id) as Licence | undefined;

  if (!licence) {
    return next(new AppError("Licence non trouvée.", 404));
  }

  if (!licence.is_valid && is_reserved) {
    return next(new AppError("La licence est invalide.", 400));
  }

  S.reserveLicenceStatment.run([is_reserved, id]);

  const updatedLicence = S.selectLicenceByIdStatment.get(id) as Licence;

  res.status(200).json({ status: "success", licence: updatedLicence });
});

const deleteAttachment = (file: string) => {
  let folderPath = "uploads";
  if (process.env.NODE_ENV === "production") {
    folderPath = "resources/uploads";
  }

  const filePath = path.join(path.resolve(), folderPath, file);

  try {
    fs.unlinkSync(filePath);
    console.log("File deleted successfully");
  } catch (err) {
    console.log(err);

    throw new AppError(`Une erreur s'est produite lors de la suppression des pièces jointes.`, 500);
  }
};

export const deleteLicencesById = tryCatch((req, res, next) => {
  const { ids } = req.params;

  const selectMultipleLicencesByIdQuery = `
    ${S.selectLicencesQuery}
    WHERE licences.id  IN (${ids})
  `;

  const licences = db.prepare(selectMultipleLicencesByIdQuery).all() as Licence[];

  db.exec("BEGIN TRANSACTION;");

  try {
    licences.forEach((licence) => {
      if (licence) {
        const attachmentsList: string[] = JSON.parse(licence.attachments);
        attachmentsList.forEach((attachment) => {
          deleteAttachment(attachment);
        });
      }
    });

    deleteDocumentsByIds(ids, S.deleteLicencesByIdQuery);
    db.exec("COMMIT;");

    return res.status(204).json({ status: "success" });
  } catch (err: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(err.message, 500));
  }
});

const deleteAllAttachments = () => {
  let folderPath = "uploads";
  if (process.env.NODE_ENV === "production") {
    folderPath = "resources/uploads";
  }
  const uploadDir = path.join(path.resolve(), folderPath);

  try {
    const files = fs.readdirSync(uploadDir);
    files.forEach((file) => {
      deleteAttachment(file);
    });

    console.log("All files deleted successfully.");
  } catch (err) {
    console.log(err);
    throw new AppError(`Une erreur s'est produite lors de la suppression des pièces jointes.`, 500);
  }
};

export const deleteAllLicences = tryCatch((_req, res, next) => {
  db.exec("BEGIN TRANSACTION;");

  try {
    deleteAllAttachments();

    S.deleteAllLicencesStatment.run();
    db.exec("COMMIT;");

    return res.status(204).json({ status: "success" });
  } catch (err: any) {
    db.exec("ROLLBACK;");
    return next(new AppError(err.message, 500));
  }
});

const storage = multer.memoryStorage();

const multerFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const { mimetype } = file;
  const isImageOrPDF = mimetype.startsWith("image") || mimetype.endsWith("pdf");

  if (!isImageOrPDF) {
    return cb(new AppError("Document invalide. Veuillez télécharger uniquement des images ou des fichiers PDF", 400));
  }

  return cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

export const uploadAttachments = upload.array("attachments");
