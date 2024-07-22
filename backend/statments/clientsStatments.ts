import db from "../database";
import generateInsertedFields from "../utils/generateInsertedFields";
import { setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXISTS clients").run();

export const selectClientsListStatment = db.prepare(`
  SELECT 
  id,
  full_name
  FROM clients
  `);

export const selectClientsQuery = `
  SELECT clients.*,
  t.last_transaction_date
  FROM clients 
  LEFT JOIN (
    SELECT
    client_id,
    MAX(transaction_date) AS last_transaction_date
    FROM transactions
    GROUP BY client_id
  ) AS t ON clients.id = t.client_id
  `;

export const selectClientByIdStatment = db.prepare(`
  SELECT * FROM clients
  WHERE id = ?
  `);

export const selectClientTransactionsTotalsStatment = `
  SELECT 
    clients.*, 
    COALESCE(SUM(CASE WHEN transactions.direction = 'entrante' AND transactions.currency = 'EUR' THEN transactions.amount ELSE 0 END), 0) AS total_entrante_eur,
    COALESCE(SUM(CASE WHEN transactions.direction = 'sortante' AND transactions.currency = 'EUR' THEN transactions.amount ELSE 0 END), 0) AS total_sortante_eur,
    COALESCE(SUM(CASE WHEN transactions.direction = 'entrante' AND transactions.currency = 'DZD' THEN transactions.amount ELSE 0 END), 0) AS total_entrante_dzd,
    COALESCE(SUM(CASE WHEN transactions.direction = 'sortante' AND transactions.currency = 'DZD' THEN transactions.amount ELSE 0 END), 0) AS total_sortante_dzd
  FROM clients
  LEFT JOIN transactions ON clients.id = transactions.client_id
  WHERE clients.id = ? --FILTER
  `;

export const selectClientTransactionsQuery = `
  SELECT * FROM transactions 
  WHERE client_id = ? --FILTER
  ORDER BY transaction_date DESC
  `;

export const selectClientLastTransactionStatment = db.prepare(`
  ${selectClientTransactionsQuery}
  LIMIT 1
  `);

const insertFields = generateInsertedFields(["full_name", "phone", "email", "address", "eur_balance", "dzd_balance"]);

export const insertClientStatment = db.prepare(`
  INSERT INTO clients
  ${insertFields}
  `);

export const updateClientStatment = db.prepare(`
  UPDATE clients
  SET ${setOptionalUpdate("full_name")},
      ${setOptionalUpdate("phone")},
      ${setOptionalUpdate("email")},
      ${setOptionalUpdate("address")},
      updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
  `);

export const deleteClientsByIdsStatment = `DELETE FROM clients WHERE id IN `;

export const deleteAllClientsStatment = db.prepare(`DELETE FROM clients`);

// db.prepare("DROP TRIGGER update_client_balance_after_insert").run();
// db.prepare("DROP TRIGGER update_client_balance_after_update").run();
// db.prepare("DROP TRIGGER update_client_balance_after_delete").run();

const incrementBalanceQuery = `
  UPDATE clients
    SET dzd_balance = dzd_balance + CASE WHEN NEW.currency = 'DZD' THEN NEW.amount ELSE 0 END,
        eur_balance = eur_balance + CASE WHEN NEW.currency = 'EUR' THEN NEW.amount ELSE 0 END
  WHERE id = NEW.client_id;
  `;
const decrementBalanceQuery = `
  UPDATE clients
  SET dzd_balance = dzd_balance - CASE WHEN OLD.currency = 'DZD' THEN OLD.amount ELSE 0 END,
      eur_balance = eur_balance - CASE WHEN OLD.currency = 'EUR' THEN OLD.amount ELSE 0 END
  WHERE id = OLD.client_id;
  `;

const updateBalanceOnInsert = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS update_client_balance_after_insert
  AFTER INSERT ON transactions
  FOR EACH ROW
  BEGIN
    ${incrementBalanceQuery}
  END;
  `);

const updateBalanceOnUpdate = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS update_client_balance_after_update
  AFTER UPDATE ON transactions
  FOR EACH ROW
  BEGIN
    ${decrementBalanceQuery}
    ${incrementBalanceQuery}
  END;
  `);

const updateBalanceOnDelete = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS update_client_balance_after_delete
  AFTER DELETE ON transactions
  FOR EACH ROW
  BEGIN
    ${decrementBalanceQuery}
  END;
  `);

updateBalanceOnInsert.run();
updateBalanceOnUpdate.run();
updateBalanceOnDelete.run();
