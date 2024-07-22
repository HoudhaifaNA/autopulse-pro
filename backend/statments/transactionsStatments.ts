import db from "../database";
import generateInsertedFields from "../utils/generateInsertedFields";
import { setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXISTS transactions").run();

export const selectTransactionsQuery = `
  SELECT transactions.*,
  clients.full_name AS client
  FROM transactions
  INNER JOIN clients ON clients.id = client_id
  `;

export const selectAllTransactionsStatment = db.prepare(selectTransactionsQuery);

export const selectTransactionById = db.prepare(`
  ${selectTransactionsQuery}
  WHERE transactions.id = ?
  `);

const INSERT_FIELDS = generateInsertedFields([
  "client_id",
  "transaction_date",
  "type",
  "product_id",
  "info1",
  "info2",
  "info3",
  "info4",
  "direction",
  "currency",
  "amount",
  "recipient",
  "note",
]);

export const insertTransactionStatment = db.prepare(`
  INSERT INTO transactions
  ${INSERT_FIELDS}
  `);

const updateTransactionQuery = `
  UPDATE transactions
  SET ${setOptionalUpdate("client_id")},
      ${setOptionalUpdate("transaction_date")},
      ${setOptionalUpdate("info1")},
      ${setOptionalUpdate("info2")},
      ${setOptionalUpdate("info3")},
      ${setOptionalUpdate("info4")},
      ${setOptionalUpdate("direction")},
      ${setOptionalUpdate("currency")},
      ${setOptionalUpdate("amount")},
      ${setOptionalUpdate("recipient")},
      ${setOptionalUpdate("note")},
      updated_at = CURRENT_TIMESTAMP
  `;

export const updateTransactionByIdStatment = db.prepare(`
  ${updateTransactionQuery}
  WHERE id = ?
  `);

export const updateTransactionByProductIdStatment = db.prepare(`
  ${updateTransactionQuery}
  WHERE type = ? AND product_id = ? AND direction = ?
  `);

export const deleteTransactionsByProductIdQuery = `
  DELETE FROM transactions
  WHERE type = ? AND direction = ? AND product_id IN
  `;

export const deleteTransactionByTypeStatment = db.prepare(`
  DELETE FROM transactions
  WHERE type = ?
  `);

export const deleteTransactionsByIdQuery = `
  DELETE FROM transactions
  WHERE id IN 
  `;

export const deleteAllTransactionsStatment = db.prepare(`DELETE FROM transactions`);
