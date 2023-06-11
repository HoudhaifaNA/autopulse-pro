import * as S from "../statments/transactionStatments";
import tryCatch from "../utils/tryCatch";

export const getAllTransactions = tryCatch((req, res) => {
  const transactions = S.getTransactions.all();

  return res
    .status(200)
    .json({ status: "success", results: transactions.length, transactions });
});

export const getTransactionById = tryCatch((req, res) => {
  const { transactionId } = req.params;

  const transaction = S.getTransactionById.get(transactionId);

  if (!transaction) throw Error("Transaction doesn't exist");

  return res.status(200).json({ status: "success", transaction });
});

export const getTransactionsByClient = tryCatch((req, res) => {
  const { clientId } = req.params;

  const transactions = S.getTransactionsByClient.all(clientId);

  return res
    .status(200)
    .json({ status: "success", results: transactions.length, transactions });
});

export const createTransaction = tryCatch((req, res) => {
  const {
    productId,
    clientId,
    date,
    type,
    info1,
    info2,
    info3,
    info4,
    total,
    way,
  } = req.body;

  const params = [
    productId,
    clientId,
    date,
    type,
    info1,
    info2,
    info3,
    info4,
    total,
    way,
  ];

  const { lastInsertRowid } = S.createTransaction.run(params);
  const newTransaction = S.getTransactionById.get(lastInsertRowid);

  return res
    .status(201)
    .json({ status: "success", transaction: newTransaction });
});

export const deleteTransactionByProduct = tryCatch((req, res) => {
  const { productId, type } = req.body;

  const { changes } = S.deleteTransactionByProduct.run([productId, type]);
  if (changes === 0) throw Error("Transaction doesn't exist");

  return res.status(204).json({ status: "success" });
});

export const deleteTransactionById = tryCatch((req, res) => {
  const { transactionId } = req.params;

  const { changes } = S.deleteTransactionById.run(transactionId);
  if (changes === 0) throw Error("Transaction doesn't exist");

  return res.status(204).json({ status: "success" });
});

export const deleteTransactions = tryCatch((req, res) => {
  S.deleteTransactions.run();

  return res.status(204).json({ status: "success" });
});
