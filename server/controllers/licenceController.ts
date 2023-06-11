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

const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  const { mimetype } = file;
  const isImageOrPDF = mimetype.startsWith("image") || mimetype.endsWith("pdf");

  if (!isImageOrPDF) {
    return cb(
      new Error("Invalid document. Please upload only images or pdfs.")
    );
  }
  return cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: multerFilter });

export const uploadAttachments = upload.array("attachments");

export const createLicence = tryCatch((req, res) => {
  const attachments = [];
  const files = req.files as Express.Multer.File[];
  const { sellerId, moudjahid, wilaya, price, releasedDate } = req.body;
  const [trimmedName, isValid] = validateName(moudjahid);

  if (!isValid) throw Error("Please, provide a valid moudjahid name");
  if (!isWilaya(wilaya)) throw Error("Please, provide a valid wilaya");

  const licence = S.getLicenceByMoudjahid.get(moudjahid);

  // Check if there is an active licence with the same moudjahid
  //@ts-ignore
  if (licence && licence.isExpirated === "false") {
    throw Error("Active licence with same moudjahid exists");
  }

  if (files.length > 0) {
    const setFilesNames = ({ fieldname, mimetype }) => {
      const fileExtension = mimetype.split("/")[1];
      attachments.push(`${fieldname}-${uid()}-${Date.now()}.${fileExtension}`);
    };
    files.forEach(setFilesNames);
  }

  const params = [
    sellerId,
    trimmedName,
    wilaya,
    price,
    JSON.stringify(attachments),
    releasedDate,
  ];

  const { lastInsertRowid } = S.createLicence.run(params);

  const today = dayjs(new Date()).format("YYYY-MM-DD");
  const transacrtionParams = [
    lastInsertRowid,
    sellerId,
    today,
    "licence",
    `LIC ${trimmedName}`,
    wilaya,
    "--",
    "--",
    price,
    "entrante",
  ];
  createTransaction.run(transacrtionParams);

  const newLicence = S.getLicenceById.get(lastInsertRowid);

  res.status(201).json({ status: "success", licence: newLicence });

  // If licence has been created save attachments
  files.forEach((file, i) => {
    const filePath = path.join(path.resolve(), "uploads", attachments[i]);

    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) console.log(`Error saving files 🔥 ${err.message}`);
    });
  });
});

export const getAllLicences = tryCatch((req, res) => {
  const licences = S.getLicences.all();

  return res
    .status(200)
    .json({ status: "success", results: licences.length, licences });
});

export const getLicenceById = tryCatch((req, res) => {
  const { id } = req.params;

  const licence = S.getLicenceById.get(id);
  if (!licence) throw Error("Licence doesn't exist");

  return res.status(200).json({ status: "success", licence });
});

export const updateLicence = tryCatch((req, res) => {
  const { id } = req.params;
  const { moudjahid, wilaya, price } = req.body;
  const [trimmedName, isValid] = moudjahid ? validateName(moudjahid) : [];

  if (moudjahid && !isValid) {
    throw Error("Please, provide valid moudjahid name");
  }
  if (wilaya && !isWilaya(wilaya)) {
    throw Error("Please, provide a valid wilaya");
  }

  if (!moudjahid && !wilaya && !price) {
    throw Error("No fields has been specified");
  }

  const params = [trimmedName, wilaya, price, id];

  const { changes } = S.updateLicence.run(params);
  if (changes === 0) throw Error("No licence with this id");

  const updatedLicence = S.getLicenceById.get(id);

  return res.status(200).json({ status: "success", licence: updatedLicence });
});

const deleteAttachments = async (file) => {
  const deleteFile = path.join(path.resolve(), "uploads", file);
  if (fs.existsSync(deleteFile)) {
    try {
      await unlink(deleteFile);
    } catch (err) {
      console.log("Error deleting files");
    }
  }
};

export const deleteLicenceById = tryCatch((req, res) => {
  const { id } = req.params;

  const licence = S.getLicenceById.get(id);

  if (!licence) throw Error("licence doesn't exist");

  S.deleteLicenceById.run(id);

  deleteTransactionByProduct.run([id, "licence"]);

  // Delete all attachment's related to this licence
  //@ts-ignore
  const attachments = JSON.parse(licence.attachments);

  attachments.forEach((at) => deleteAttachments(at));

  return res.status(204).json({ status: "success" });
});

export const deleteLicences = tryCatch(async (req, res) => {
  S.deleteLicences.run();
  deleteTransactionByType.run(["licence"]);

  const uploadDir = path.join(path.resolve(), "uploads");

  // Delete all attachments
  await Promise.all(
    (await readdir(uploadDir)).map((file) => deleteAttachments(file))
  );

  return res.status(204).json({ status: "success" });
});
