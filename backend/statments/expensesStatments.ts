import db from "../database";
import generateInsertedFields from "../utils/generateInsertedFields";
import { setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXISTS expenses").run();

export const selectAllExpensesQuery = `
  SELECT * FROM expenses
  `;

export const selectExpensesByGroupQuery = `
  SELECT
  raison,
  DATE(expense_date) AS date_group,
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
  WHERE DATE(expense_date) IN
  `;

export const deleteAllExpensesQuery = db.prepare(`DELETE FROM expenses`);
