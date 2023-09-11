import db from "../database";
import generateInsertedFields from "../utils/generateInsertedFields";
import { checkNumber, setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXISTS expenses").run();

const createExpensesTableStatment = db.prepare(`
  CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER NOT NULL PRIMARY KEY,
    expense_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    raison TEXT NOT NULL,
    cost INTEGER NOT NULL ${checkNumber("cost")},
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

createExpensesTableStatment.run();

export const selectAllExpensesQuery = `
  SELECT * FROM expenses
  `;

export const selectExpensesByGroupQuery = `
  SELECT
  raison,
  strftime('%Y-%m-%d', expense_date) AS date_group,
  COUNT(*) AS count,
  SUM(cost) AS total_cost
  FROM expenses
  `;

export const selectExpenseByIdStatment = db.prepare(`
  SELECT * FROM expenses
  WHERE id = ?
  `);

const INSERTED_FIELDS = generateInsertedFields(["expense_date", "raison", "cost"]);

export const insertExpenseStatment = db.prepare(`
  INSERT INTO expenses
  ${INSERTED_FIELDS}
  `);

export const updateExpenseStatment = db.prepare(`
  UPDATE expenses
  SET ${setOptionalUpdate("expense_date")},
    ${setOptionalUpdate("raison")},
    ${setOptionalUpdate("cost")},
    updated_at = CURRENT_TIMESTAMP
  WHERE id = ? 
  `);

export const deleteExpensesByIdQuery = `
  DELETE FROM expenses
  WHERE id IN
  `;

export const deleteExpensesByDateQuery = `
  DELETE FROM expenses
  WHERE strftime('%Y-%m-%d', expense_date) IN
  `;

export const deleteAllExpensesQuery = db.prepare(`DELETE FROM expenses`);
