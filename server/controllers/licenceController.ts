import fs from "fs";
import { readdir, unlink } from "fs/promises";
import path from "path";

import multer from "multer";
import dayjs from "dayjs";

import * as S from "../statments/licenceStatments";
import {
  createTransaction,
  deleteTransactionByProduct,
  deleteTransactionByType,
} from "../statments/transactionStatments";
import tryCatch from "../utils/tryCatch";
import { isWilaya, validateName } from "../utils/validations";
import uid from "../../renderer/utils/uniqid";
import AppError from "../utils/AppError";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";

const isProd: boolean = process.env.NODE_ENV === "production";

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  const { mimetype } = file;
  const isImageOrPDF = mimetype.startsWith("image") || mimetype.endsWith("pdf");

  if (!isImageOrPDF) {
    return cb(
      new AppError(
        "Document invalide. Veuillez télécharger uniquement des images ou des fichiers PDF",
        400
      )
    );
  }
  return cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

export const uploadAttachments = upload.array("attachments");

export const createLicence = tryCatch((req, res, next) => {
  const files = req.files as Express.Multer.File[];
  let {
    sellerId,
    moudjahid,
    serialNumber,
    wilaya,
    price,
    releasedDate,
    created_at,
  } = req.body;
  const [trimmedName, isValid] = validateName(moudjahid);
  const createdAtDate = dayjs(created_at).format("YYYY-MM-DD");

  if (!price) price = 0;

  if (!isValid) return next(new AppError("Nom moudjahid incorrect", 400));

  if (wilaya && !isWilaya(wilaya)) {
    return next(new AppError("Nom de wilaya incorrect", 400));
  }

  const moudjahidLicences = S.getLicenceByMoudjahid.all(
    trimmedName.toLowerCase()
  );

  let isThereOneLicenceActive;
  // Check if there is an active licence with the same moudjahid
  moudjahidLicences.find((lc: any) => {
    if (lc.isExpirated === "false" && lc.serialNumber === serialNumber) {
      isThereOneLicenceActive = true;
    }
  });

  if (isThereOneLicenceActive) {
    return next(
      new AppError("Une licence active avec le même moudjahid existe", 403)
    );
  }

  const attachments = [];

  if (files.length > 0) {
    const setFilesNames = ({ fieldname, mimetype }) => {
      const fileExtension = mimetype.split("/")[1];
      attachments.push(`${fieldname}-${uid()}-${Date.now()}.${fileExtension}`);
    };

    files.forEach(setFilesNames);
  }

  const params = [
    sellerId,
    trimmedName.toLowerCase(),
    serialNumber,
    wilaya,
    price,
    JSON.stringify(attachments),
    releasedDate,
    createdAtDate,
  ];

  const { lastInsertRowid } = S.createLicence.run(params);

  const transacrtionParams = [
    lastInsertRowid,
    sellerId,
    createdAtDate,
    "licence",
    "licence",
    trimmedName,
    wilaya,
    "--",
    price,
    "entrante",
  ];
  createTransaction.run(transacrtionParams);

  const newLicence = S.getLicenceById.get(lastInsertRowid);

  res.status(201).json({ status: "success", licence: newLicence });

  // If licence has been created save attachments
  files.forEach((file, i) => {
    let filePath = path.join(path.resolve(), "uploads", attachments[i]);
    if (isProd) {
      filePath = path.join(
        path.resolve(),
        "resources",
        "uploads",
        attachments[i]
      );
    }
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) return console.log(`Error saving files 📁 ${err}`);
    });
  });
});

export const getAllLicences = tryCatch((req, res, next) => {
  const licences = S.getLicences.all();

  return res
    .status(200)
    .json({ status: "success", results: licences.length, licences });
});

export const getLicenceById = tryCatch((req, res, next) => {
  const { ids } = req.params;

  const licence = S.getLicenceById.get(ids);
  if (!licence) return next(new AppError("Licence n'existe pas", 404));

  return res.status(200).json({ status: "success", licence });
});

export const updateLicence = tryCatch((req, res, next) => {
  const { ids } = req.params;
  const { moudjahid, serialNumber, wilaya, price } = req.body;
  const [trimmedName, isValid] = validateName(moudjahid);

  if (moudjahid && !isValid) {
    return next(new AppError("Nom moudjahid incorrect", 400));
  }

  if (wilaya && !isWilaya(wilaya)) {
    return next(new AppError("Nom de wilaya incorrect", 400));
  }

  const params = [trimmedName, serialNumber, wilaya, price, ids];

  const { changes } = S.updateLicence.run(params);
  if (changes === 0) return next(new AppError("Licence n'existe pas", 404));

  const updatedLicence = S.getLicenceById.get(ids);

  return res.status(200).json({ status: "success", licence: updatedLicence });
});

const deleteAttachments = async (file) => {
  const deleteFile = path.join(path.resolve(), "uploads", file);
  if (fs.existsSync(deleteFile)) {
    try {
      await unlink(deleteFile);
    } catch (err) {
      return console.log(`Error deleting files 📁 ${err}`);
    }
  }
};

export const deleteLicenceById = tryCatch((req, res) => {
  const { ids } = req.params;
  const licences: any[] = ids.split(",").map((id) => S.getLicenceById.get(id));

  deleteDocumentsByIds(ids, S.deleteLicenceById);
  deleteDocumentsByIds(ids, deleteTransactionByProduct, ["licence"]);

  // Delete all attachment's related to this licence
  licences.forEach(({ attachments }) => {
    const attachmentsList = JSON.parse(attachments);
    attachmentsList.forEach((at) => deleteAttachments(at));
  });

  return res.status(204).json({ status: "success" });
});

export const deleteLicences = tryCatch((req, res) => {
  S.deleteLicences.run();
  deleteTransactionByType.run("licence");

  const uploadDir = path.join(path.resolve(), "uploads");

  // Delete all attachments
  (async () => {
    await Promise.all(
      (await readdir(uploadDir)).map((file) => deleteAttachments(file))
    );
  })();

  return res.status(204).json({ status: "success" });
});
