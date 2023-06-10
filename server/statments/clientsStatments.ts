import db from "../database";

const IS_NUMBER = (field) =>
  `CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;

// db.prepare("DROP TABLE clients").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS clients(
    id INTEGER NOT NULL PRIMARY KEY,
    fullName TEXT NOT NULL UNIQUE COLLATE NOCASE,
    phoneNumber TEXT NOT NULL UNIQUE,
    balance INTEGER NOT NULL ${IS_NUMBER("balance")}
)`
).run();

export const createClient = db.prepare(`INSERT INTO clients(
    fullName,
    phoneNumber,
    balance
) VALUES (?,?,?)`);

export const getClients = db.prepare(`SELECT * FROM clients`);

export const getClientById = db.prepare(`SELECT * FROM clients WHERE id = ?`);

export const updateClient = db.prepare(`UPDATE clients 
    SET fullName = COALESCE(?, fullName),
    phoneNumber = COALESCE(?, phoneNumber),
    balance = COALESCE(balance + ?, balance)
    WHERE id = ? `);

export const deleteClientById = db.prepare(`DELETE FROM clients WHERE id = ?`);

export const deleteClients = db.prepare(`DELETE FROM clients`);
