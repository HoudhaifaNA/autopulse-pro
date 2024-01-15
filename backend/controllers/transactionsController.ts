import db from "../database";
import * as S from "../statments/transactionsStatments";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";
import AppError from "../utils/AppError";
import tryCatch from "../utils/tryCatch";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";

interface ITotalCount {
  total_count: number;
}

export const getAllTransactions = tryCatch((_req, res) => {
  const transactions = S.selectAllTransactionsStatment.all();

  return res.status(200).json({ status: "success", results: transactions.length, transactions });
});

export const getFiatTransactions = tryCatch((req, res) => {
  const { currency } = req.params;
  const { direction, orderBy = "-transaction_date", page = 1, limit = 250 } = req.query;

  const orderByQuery = formatSortingQuery(orderBy);

  const skip = (Number(page) - 1) * Number(limit);

  const rangeFilters = ["transaction_date", "amount"];
  const filterQueries = generateRangeFilters(rangeFilters, req.query, "transactions");

  const currencyFilter = `type = 'Fiat' AND currency = ?`;
  filterQueries.push(currencyFilter);

  if (direction) {
    const directionFilter = `direction = '${direction}'`;
    filterQueries.push(directionFilter);
  }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";

  const selectFiatTransaction = `
    ${S.selectTransactionsQuery}
    ${filterClause}
    ${orderByQuery}
    LIMIT ? OFFSET ?
  `;

  const selectFiatTransactionCount = `
    SELECT COUNT(*) AS total_count
    FROM transactions
    ${filterClause}
  `;

  const fiat_transactions = db.prepare(selectFiatTransaction).all([currency, limit, skip]);
  const { total_count } = db.prepare(selectFiatTransactionCount).get(currency) as ITotalCount;

  return res.status(200).json({
    status: "success",
    results: total_count,
    records_in_page: fiat_transactions.length,
    fiat_transactions,
  });
});

export const getTransactionById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const transaction = S.selectTransactionById.get(id);

  if (!transaction) {
    return next(new AppError("Transaction non trouvée.", 404));
  }

  return res.status(200).json({ status: "success", transaction });
});

export const createTransaction = tryCatch((req, res) => {
  const {
    client_id,
    transaction_date,
    type,
    product_id,
    info1,
    info2,
    info3,
    info4,
    direction,
    currency,
    amount,
    note,
  } = req.body;

  const params = {
    client_id,
    transaction_date,
    type,
    product_id,
    info1,
    info2,
    info3,
    info4,
    direction,
    currency,
    amount,
    note,
  };

  const { lastInsertRowid } = S.insertTransactionStatment.run(params);
  const newTransaction = S.selectTransactionById.get(lastInsertRowid);

  return res.status(201).json({ status: "success", transaction: newTransaction });
});

export const updateTransaction = tryCatch((req, res, next) => {
  const { id } = req.params;
  const { client_id, transaction_date, info1, info2, info3, info4, direction, currency, amount, note } = req.body;

  const params = [client_id, transaction_date, info1, info2, info3, info4, direction, currency, amount, note, id];

  const { changes } = S.updateTransactionByIdStatment.run(params);

  if (!changes) {
    return next(new AppError("Transaction non trouvée.", 404));
  }

  const transaction = S.selectTransactionById.get(id);

  return res.status(201).json({ status: "success", transaction: transaction });
});

export const deleteTransactionsByIds = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deleteTransactionsByIdQuery);

  return res.status(204).json({ status: "success" });
});

export const deleteAllTransactions = tryCatch((req, res, next) => {
  S.deleteAllTransactionsStatment.run();

  return res.status(204).json({ status: "success" });
});
