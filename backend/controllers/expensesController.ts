import db from "../database";
import * as S from "../statments/expensesStatments";
import { formatSortingQuery, generateRangeFilters, setRangeFilter } from "../utils/APIFeatures";
import tryCatch from "../utils/tryCatch";
import AppError from "../utils/AppError";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";

export const getAllExpenses = tryCatch((req, res) => {
  const { groupBy, total_cost, orderBy = "-expense_date", page = 1, limit = 250 } = req.query;

  const rangeFilters = ["expense_date", "cost"];

  const skip = (Number(page) - 1) * Number(limit);

  const filterQueries = generateRangeFilters(rangeFilters, req.query, "expenses");

  let havingClause = "";

  if (typeof total_cost === "string") {
    havingClause = `HAVING ${setRangeFilter(total_cost, "total_cost", true)}`;
  }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  let selectExpensesQuery = `
  ${S.selectAllExpensesQuery}
  ${filterClause}
	${orderByQuery}
	LIMIT ? OFFSET ?
  `;

  const groupExpensesQuery = `
  ${S.selectExpensesByGroupQuery}
	${filterClause}
  GROUP BY LOWER(${groupBy})
  ${havingClause}
	${orderByQuery}
	LIMIT ? OFFSET ?
  `;

  let selectExpensesCountQuery = `
    SELECT * FROM expenses
    ${filterClause}
    `;

  if (groupBy) {
    selectExpensesQuery = groupExpensesQuery;
    selectExpensesCountQuery = `
    SELECT
    DATE(expense_date) AS date_group,
    SUM(cost) AS total_cost 
    FROM expenses
    ${filterClause}
    GROUP BY LOWER(${groupBy})
    ${havingClause}
    `;
  }

  const expenses = db.prepare(selectExpensesQuery).all([limit, skip]);
  const expenses_count = db.prepare(selectExpensesCountQuery).all();

  return res
    .status(200)
    .json({ status: "success", results: expenses_count.length, records_in_page: expenses.length, expenses });
});

export const getExpensesByGroup = tryCatch((req, res, next) => {
  const { orderBy = "-expense_date" } = req.query;
  const { date } = req.params;

  const rangeFilters = ["expense_date", "cost"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query, "expenses");

  // if (!date && !raison) {
  //   return next(new AppError("Veuillez fournir une date ou une raison pour effectuer la recherche.", 404));
  // }

  if (date) {
    filterQueries.push(`DATE(expense_date) = '${date}'`);
  }

  // if (raison && typeof raison === "string") {
  //   filterQueries.push(`LOWER(raison) = '${raison.toLowerCase()}'`);
  // }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  let selectExpensesByGroupQuery = `
		SELECT * FROM expenses
		${filterClause}
		${orderByQuery}
	`;

  const expenses = db.prepare(selectExpensesByGroupQuery).all();

  return res.status(200).json({ status: "success", results: expenses.length, expenses });
});

export const getExpenseById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const expense = S.selectExpenseByIdStatment.get(id);

  if (!expense) {
    return next(new AppError("Dépense non trouvée.", 404));
  }

  return res.status(200).json({ status: "success", expense });
});

export const createExpense = tryCatch((req, res) => {
  const { expense_date, raison, cost, note } = req.body;

  const params = { expense_date, raison, cost, note };

  const { lastInsertRowid } = S.insertExpenseStatment.run(params);

  const newExpense = S.selectExpenseByIdStatment.get(lastInsertRowid);

  return res.status(201).json({ status: "success", expense: newExpense });
});

export const updateExpense = tryCatch((req, res, next) => {
  const { id } = req.params;
  const { expense_date, raison, cost, note } = req.body;

  const params = [expense_date, raison, cost, note, id];

  const { changes } = S.updateExpenseStatment.run(params);

  if (!changes) {
    return next(new AppError("Dépense non trouvée.", 404));
  }

  const updatedExpense = S.selectExpenseByIdStatment.get(id);

  return res.status(200).json({ status: "success", expense: updatedExpense });
});

export const deleteExpensesByDate = tryCatch((req, res) => {
  const { dates } = req.params;

  deleteDocumentsByIds(dates, S.deleteExpensesByDateQuery);

  return res.status(204).json({ status: "success" });
});

export const deleteExpensesById = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deleteExpensesByIdQuery);

  return res.status(204).json({ status: "success" });
});

export const deleteAllExpenses = tryCatch((_req, res) => {
  S.deleteAllExpensesQuery.run();

  return res.status(204).json({ status: "success" });
});
