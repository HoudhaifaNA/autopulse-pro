import isMobilePhone from "validator/lib/isMobilePhone";
import isEmail from "validator/lib/isEmail";

import db from "../database";
import * as S from "../statments/clientsStatments";
import { formatSortingQuery, setRangeFilter } from "../utils/APIFeatures";
import AppError from "../utils/AppError";
import tryCatch from "../utils/tryCatch";
import deleteDocumentsByIds from "../utils/deleteDocumentsByIds";

interface CountResult {
  total_clients: number;
}

export const verifyClientInfo = tryCatch((req, _res, next) => {
  const { phone, email } = req.body;

  if (phone && !isMobilePhone(phone)) {
    return next(new AppError("Numéro de téléphone invalide. Veuillez entrer un numéro de téléphone valide.", 400));
  }
  if (email && !isEmail(email)) {
    return next(new AppError("Adresse e-mail invalide. Veuillez entrer une adresse e-mail valide.", 400));
  }

  next();
});

export const getAllClients = tryCatch((req, res) => {
  const { orderBy, dzd_balance, eur_balance, created_at, page = 1, limit = 10 } = req.query;

  let filterQueries: string[] = [];
  const skip = (Number(page) - 1) * Number(limit);

  if (dzd_balance) {
    const dzdFilterQuery = setRangeFilter(dzd_balance, "dzd_balance");
    filterQueries.push(dzdFilterQuery);
  }

  if (eur_balance) {
    const eurFilterQuery = setRangeFilter(eur_balance, "eur_balance");
    filterQueries.push(eurFilterQuery);
  }

  if (created_at) {
    const createdAtQuery = setRangeFilter(created_at, "created_at");
    filterQueries.push(createdAtQuery);
  }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  const selectClientsQuery = `
    ${S.selectClientsQuery}
    ${filterClause}
    ${orderByQuery}
    LIMIT ? OFFSET ?
  `;

  const countClientQuery = `
    SELECT COUNT(*) AS total_clients
    FROM clients
    ${filterClause}
   `;

  const selectClientsStatment = db.prepare(selectClientsQuery);
  const selectClientsCount = db.prepare(countClientQuery);

  const clients = selectClientsStatment.all([limit, skip]);
  const { total_clients } = selectClientsCount.get() as CountResult;

  return res.status(200).json({
    status: "success",
    total_clients,
    results: clients.length,
    clients,
  });
});

export const getClientById = tryCatch((req, res, next) => {
  const { id } = req.params;

  const client = S.selectClientByIdStatment.get(id);
  if (!client) {
    return next(new AppError("Client non trouvé. Veuillez vérifier les informations.", 404));
  }

  return res.status(200).json({ status: "success", client });
});

export const getClientTransactions = tryCatch((req, res, next) => {
  const { id } = req.params;
  const { currency } = req.query;

  const client = S.selectClientByIdStatment.get(id);
  if (!client) {
    return next(new AppError("Client non trouvé. Veuillez vérifier les informations.", 404));
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
    return next(new AppError("Client non trouvé. Veuillez vérifier les informations.", 404));
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

  if (changes === 0) {
    return next(new AppError("Client non trouvé. Veuillez vérifier les informations.", 404));
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
