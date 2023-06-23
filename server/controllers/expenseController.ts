import dayjs from "dayjs";

import * as S from "../statments/expensesStatments";
import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";

export const getAllExpenses = tryCatch((req, res) => {
  const expenses = S.getExpenses.all();

  return res
    .status(200)
    .json({ status: "success", results: expenses.length, expenses });
});

export const getExpenseById = tryCatch((req, res, next) => {
  const { ids } = req.params;

  const expense = S.getExpenseById.get(ids);

  if (!expense) return next(new AppError("Dépense n'existe pas", 404));

  return res.status(200).json({ status: "success", expense });
});

export const createExpense = tryCatch((req, res) => {
  const { transferred_at, raison, amount } = req.body;

  const transferredDate = dayjs(transferred_at).format("YYYY-MM-DD");

  const params = [transferredDate, raison, amount];

  const { lastInsertRowid } = S.createExpense.run(params);

  const newExpense = S.getExpenseById.get(lastInsertRowid);

  return res.status(201).json({ status: "success", expense: newExpense });
});

export const updateExpense = tryCatch((req, res, next) => {
  const { ids } = req.params;
  const { raison, amount } = req.body;
  const params = [raison, amount, ids];

  const { changes } = S.updateExpense.run(params);
  if (changes === 0) return next(new AppError("Dépense n'existe pas", 404));

  const updatedExpense = S.getExpenseById.get(ids);

  return res.status(200).json({ status: "success", expense: updatedExpense });
});

export const deleteExpenseById = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deleteExpenseById);

  return res.status(204).json({ status: "success" });
});

export const deleteExpenses = tryCatch((req, res) => {
  S.deleteExpenses.run();

  return res.status(204).json({ status: "success" });
});
