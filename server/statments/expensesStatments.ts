import db from "../database";

const IS_NUMBER = (field) =>
  `CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;

// db.prepare("DROP TABLE expenses").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER NOT NULL PRIMARY KEY,
    transferred_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    raison TEXT NOT NULL,
    amount INTEGER NOT NULL ${IS_NUMBER("amount")},
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`
).run();

export const createExpense = db.prepare(`INSERT INTO expenses(
    transferred_at,
    raison,
    amount
) VALUES (?,?,?)`);

export const getExpenses = db.prepare(
  `SELECT * FROM expenses ORDER BY transferred_at DESC`
);

export const getExpenseById = db.prepare(`SELECT * FROM expenses WHERE id = ?`);

export const updateExpense = db.prepare(`UPDATE expenses
    SET raison = COALESCE(?, raison),
    amount = COALESCE(?, amount)
    WHERE id = ? `);

export const deleteExpenseById = `DELETE FROM expenses WHERE id IN `;

export const deleteExpenses = db.prepare(`DELETE FROM expenses`);
