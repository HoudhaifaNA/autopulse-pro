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

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
function generateRandomExpenses(count: number) {
  const stmt = db.prepare(`
    INSERT INTO expenses (expense_date, raison, cost)
    VALUES (?, ?, ?)
  `);

  const now = new Date();

  for (let i = 0; i < count; i++) {
    let expenseDate;

    if (i < 5) {
      expenseDate = new Date(2023, 0, 15).toISOString().replace("T", " ").slice(0, 19);
    } else {
      expenseDate = getRandomDate(new Date(2000, 0, 1), now).toISOString().replace("T", " ").slice(0, 19);
    }

    const raison = `Expense ${i + 1}`;
    const cost = Math.floor(Math.random() * 100000) + 1;

    stmt.run(expenseDate, raison, cost);
  }
}

// generateRandomExpenses(20);

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
