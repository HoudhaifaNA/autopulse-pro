import tryCatch from "../utils/tryCatch";
import * as S from "../statments/procurationStatments";
import AppError from "../utils/AppError";
import { getLicenceById } from "../statments/licenceStatments";
import { getCarById } from "../statments/carStatments";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";
import { createExpense } from "../statments/expensesStatments";
import {
  createTransaction,
  deleteTransactionByProduct,
  deleteTransactionByType,
} from "../statments/transactionStatments";
import dayjs from "dayjs";

export const getProcurations = tryCatch((req, res) => {
  const procurations = S.getProcurations.all();

  return res
    .status(200)
    .json({ status: "success", results: procurations.length, procurations });
});
export const getProcurationById = tryCatch((req, res, next) => {
  const { ids } = req.params;

  const procuration = S.getProcurationById.get(ids);
  if (!procuration) return next(new AppError("Procuration n'existe pas", 404));

  return res.status(200).json({ status: "success", procuration });
});

export const createProcuration = tryCatch((req, res, next) => {
  const { licenceId, price, issued_date, created_at, type } = req.body;

  const licence: any = getLicenceById.get(licenceId);
  if (!licence || !licence.carId) {
    return next(new AppError("Invalid licence", 400));
  }
  const { carId, sellerId } = licence;
  const car: any = getCarById.get(carId);
  const { buyerId, procuration } = car;
  if (!buyerId) {
    return next(new AppError("Voiture n'est pas encore vendue", 400));
  }
  if (procuration !== "true") {
    return next(new AppError("Voiture n'a pas de procuration", 400));
  }

  let currentTime = dayjs(new Date()).format("YYYY-MM-DD");
  if (created_at) currentTime = dayjs(created_at).format("YYYY-MM-DD");
  const params = [
    sellerId,
    licenceId,
    buyerId,
    carId,
    price,
    type,
    issued_date || currentTime,
    created_at || currentTime,
  ];
  const { lastInsertRowid } = S.createProcuration.run(params);

  if (type === "transaction") {
    const transacrtionParams = [
      lastInsertRowid,
      sellerId,
      created_at || currentTime,
      "procuration",
      "procuration",
      licence.moudjahid,
      car.name,
      "--",
      price,
      "entrante",
    ];
    createTransaction.run(transacrtionParams);
  } else if (type === "expense") {
    createExpense.run([currentTime, `Procuration ${licence.moudjahid}`, price]);
  }

  const newProcuration = S.getProcurationById.get(lastInsertRowid);

  return res.status(201).json({ status: "success", newProcuration });
});

export const updateProcuration = tryCatch((req, res, next) => {
  const { ids } = req.params;
  const { price, created_at, issued_date, received_date } = req.body;

  const procuration: any = S.getProcurationById.get(ids);

  if (!procuration) {
    return next(new AppError("Procuration n'existe pas", 404));
  }
  S.updateProcuration.run([price, created_at, issued_date, received_date, ids]);
  const updatedProcuration: any = S.getProcurationById.get(ids);

  const licence: any = getLicenceById.get(procuration.licenceId);
  const car: any = getCarById.get(procuration.carId);

  if (procuration.type === "transaction") {
    const transacrtionParams = [
      updatedProcuration.id,
      updatedProcuration.sellerId,
      updatedProcuration.created_at,
      "procuration",
      "procuration",
      licence.moudjahid,
      car.name,
      "--",
      price,
      "entrante",
    ];
    deleteDocumentsByIds(ids, deleteTransactionByProduct, ["procuration"]);
    createTransaction.run(transacrtionParams);
  }
  return res.status(200).json({ status: "success", procuration });
});

export const deleteProcurationById = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deleteProcurationById);
  deleteDocumentsByIds(ids, deleteTransactionByProduct, ["procuration"]);

  return res.status(204).json({ status: "success" });
});

export const deleteProcurations = tryCatch((req, res) => {
  S.deleteProcurations.run();
  deleteTransactionByType.run("procuration");
  return res.status(204).json({ status: "success" });
});
