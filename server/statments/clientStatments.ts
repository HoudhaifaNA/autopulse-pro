import db from "../database";

const IS_NUMBER = (field) =>
  `CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;

// db.prepare("DROP TABLE clients").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS clients(
    id INTEGER NOT NULL PRIMARY KEY,
    fullName TEXT NOT NULL UNIQUE COLLATE NOCASE,
    phoneNumber TEXT NOT NULL UNIQUE,
    balance INTEGER NOT NULL ${IS_NUMBER("balance")},
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
)`
).run();

export const createClient = db.prepare(`INSERT INTO clients(
    fullName,
    phoneNumber,
    balance,
    created_at
) VALUES (?,?,?,?)`);

export const getClients = db.prepare(
  `SELECT c.*, t.lastTransactionDate
    FROM clients AS c
    LEFT JOIN (
      SELECT clientId, MAX(date) AS lastTransactionDate
      FROM transactions
      GROUP BY clientId
  ) AS t ON c.id = t.clientId
  ORDER BY created_at DESC
  `
);

export const getClientById = db.prepare(`SELECT * FROM clients WHERE id = ?`);

export const updateClient = db.prepare(`UPDATE clients 
    SET fullName = COALESCE(?, fullName),
    phoneNumber = COALESCE(?, phoneNumber)
    WHERE id = ? `);

export const updateBalance = db.prepare(`UPDATE clients
  SET balance = balance + ?
  WHERE id = ?
`);

export const deleteClientById = `DELETE FROM clients WHERE id IN `;

export const deleteClients = db.prepare(`DELETE FROM clients`);
