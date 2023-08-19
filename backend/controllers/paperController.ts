import tryCatch from "../utils/tryCatch";
import * as S from "../statments/papersStatments";
import AppError from "../utils/AppError";
import { getLicenceById } from "../statments/licenceStatments";
import { getCarById } from "../statments/carsStatments";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";
import { createExpense } from "../statments/expensesStatments";
import {
  createTransaction,
  deleteTransactionByProduct,
  deleteTransactionByType,
} from "../statments/transactionStatments";
import { getClientById } from "../statments/clientStatments";
import dayjs from "dayjs";

export const getPapers = tryCatch((req, res) => {
  const papers = S.getPapers.all();

  return res.status(200).json({ status: "success", results: papers.length, papers });
});
export const getPaperById = tryCatch((req, res, next) => {
  const { ids } = req.params;

  const paper = S.getPaperById.get(ids);
  if (!paper) return next(new AppError("Dossier n'existe pas", 404));

  return res.status(200).json({ status: "success", paper });
});

export const createPaper = tryCatch((req, res, next) => {
  const { carId, sellerId, price, issued_date, created_at, type } = req.body;

  const car: any = getCarById.get(carId);
  const seller: any = getClientById.get(sellerId);
  if (!car) return next(new AppError("Voiture n'existe pas", 404));
  if (!car.buyerId) {
    return next(new AppError("Voiture n'est pas encore vendue", 400));
  }
  if (!seller || seller.clientType === "euro") {
    return next(new AppError("Invalid vendeur", 404));
  }
  let currentTime = dayjs(new Date()).format("YYYY-MM-DD");
  if (created_at) currentTime = dayjs(created_at).format("YYYY-MM-DD");

  const params = [sellerId, car.ownerName, carId, price, type, issued_date || currentTime, created_at || currentTime];
  const { lastInsertRowid } = S.createPaper.run(params);

  if (type === "transaction") {
    const transacrtionParams = [
      lastInsertRowid,
      sellerId,
      created_at || currentTime,
      "paper",
      "dossier",
      car.name,
      car.registrationNumber,
      car.owner,
      price,
      "entrante",
    ];
    createTransaction.run(transacrtionParams);
  } else if (type === "expense") {
    createExpense.run([currentTime, `Dossier ${car.name} (${car.registrationNumber})`, price]);
  }

  const newPaper = S.getPaperById.get(lastInsertRowid);

  return res.status(201).json({ status: "success", newPaper });
});

export const updatePaper = tryCatch((req, res, next) => {
  const { ids } = req.params;
  const { price, created_at, issued_date, received_date } = req.body;

  const paper: any = S.getPaperById.get(ids);

  if (!paper) {
    return next(new AppError("Dossier n'existe pas", 404));
  }
  S.updatePaper.run([price, created_at, issued_date, received_date, ids]);

  const updatedPaper: any = S.getPaperById.get(ids);
  const car: any = getCarById.get(paper.carId);

  if (paper.type === "transaction") {
    const transacrtionParams = [
      updatedPaper.id,
      updatedPaper.sellerId,
      updatedPaper.created_at,
      "paper",
      "dossier",
      car.name,
      car.registrationNumber,
      car.owner,
      price,
      "entrante",
    ];
    deleteDocumentsByIds(ids, deleteTransactionByProduct, ["paper"]);
    createTransaction.run(transacrtionParams);
  }
  return res.status(200).json({ status: "success", paper });
});

export const deletePaperById = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deletePaperById);
  deleteDocumentsByIds(ids, deleteTransactionByProduct, ["paper"]);

  return res.status(204).json({ status: "success" });
});

export const deletePapers = tryCatch((req, res) => {
  S.deletePapers.run();
  deleteTransactionByType.run("paper");
  return res.status(204).json({ status: "success" });
});
