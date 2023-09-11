import isMobilePhone from "validator/lib/isMobilePhone";
import isEmail from "validator/lib/isEmail";

import db from "../database";
import * as S from "../statments/clientsStatments";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";
import AppError from "../utils/AppError";
import tryCatch from "../utils/tryCatch";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";

export const verifyClientInfo = tryCatch((req, _res, next) => {
  const { phone, email } = req.body;

  const phoneNumbersArray = (phone || "").split(",");

  for (const phoneNumber of phoneNumbersArray) {
    if (phoneNumber && !isMobilePhone(phoneNumber.trim(), "any", { strictMode: false })) {
      return next(new AppError("Numéro de téléphone invalide. Veuillez entrer un numéro de téléphone valide.", 400));
    }
  }
  if (email && !isEmail(email)) {
    return next(new AppError("Adresse e-mail invalide. Veuillez entrer une adresse e-mail valide.", 400));
  }

  next();
});

export const getClientsList = tryCatch((_req, res) => {
  const clients = S.selectClientsListStatment.all();

  return res.status(200).json({ status: "success", results: clients.length, clients });
});

export const getAllClients = tryCatch((req, res) => {
  const { orderBy = "-last_transaction_date", page = 1, limit = 10 } = req.query;

  const ranges = ["created_at", "last_transaction_date", "dzd_balance", "eur_balance"];
  const skip = (Number(page) - 1) * Number(limit);

  const filterQueries = generateRangeFilters(ranges, req.query);

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  const selectClientsQuery = `
    ${S.selectClientsQuery}
    ${filterClause}
    ${orderByQuery}
    LIMIT ? OFFSET ?
  `;

  const selectClientsCountQuery = `
    ${S.selectClientsQuery}
    ${filterClause}
   `;

  const selectClientsStatment = db.prepare(selectClientsQuery);
  const selectClientsCountStatment = db.prepare(selectClientsCountQuery);

  const clients = selectClientsStatment.all([limit, skip]);
  const allClients = selectClientsCountStatment.all();

  return res
    .status(200)
    .json({ status: "success", results: allClients.length, records_in_page: clients.length, clients });
});

export const getClientById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const client = S.selectClientByIdStatment.get(id);
  if (!client) {
    return next(new AppError("Client non trouvé.", 404));
  }

  return res.status(200).json({ status: "success", client });
});

export const getClientTransactions = tryCatch((req, res, next) => {
  const { id } = req.params;
  const { currency } = req.query;

  const client = S.selectClientByIdStatment.get(id);
  if (!client) {
    return next(new AppError("Client non trouvé.", 404));
  }

  let currencyFilter = ``;

  if (currency) {
    currencyFilter = ` AND currency = '${currency}' `;
  }

  const clientTransactionsQuery = S.selectClientTransactionsQuery.replace("--CURRENCY", currencyFilter);

  const transactions = db.prepare(clientTransactionsQuery).all(id);

  return res.status(200).json({ status: "success", results: transactions.length, client, transactions });
});

export const getClientLastTransaction = tryCatch((req, res, next) => {
  const { id } = req.params;

  const client = S.selectClientByIdStatment.get(id);
  if (!client) {
    return next(new AppError("Client non trouvé.", 404));
  }

  const lastTransaction = S.selectClientLastTransactionStatment.get(id);

  return res.status(200).json({ status: "success", client, last_transaction: lastTransaction });
});

export const createClient = tryCatch((req, res) => {
  const { full_name, phone, email, address, eur_balance = 0, dzd_balance = 0 } = req.body;

  const params = { full_name, phone, email, address, eur_balance, dzd_balance };

  const { lastInsertRowid } = S.insertClientStatment.run(params);
  const newClient = S.selectClientByIdStatment.get(lastInsertRowid);

  return res.status(201).json({ status: "success", client: newClient });
});

export const updateClient = tryCatch((req, res, next) => {
  const { full_name, phone, email, address } = req.body;
  const { id } = req.params;

  const params = [full_name, phone, email, address, id];

  const { changes } = S.updateClientStatment.run(params);

  if (!changes) {
    return next(new AppError("Client non trouvé.", 404));
  }

  const updatedClient = S.selectClientByIdStatment.get(id);

  return res.status(200).json({ status: "success", client: updatedClient });
});

export const deleteClientsByIds = tryCatch((req, res) => {
  const { ids } = req.params;

  deleteDocumentsByIds(ids, S.deleteClientsByIdsStatment);

  return res.status(204).json({ status: "success" });
});

export const deleteAllClients = tryCatch((_req, res) => {
  S.deleteAllClientsStatment.run();

  return res.status(204).json({ status: "success" });
});
