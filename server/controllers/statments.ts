import db from "../database";

// db.prepare("DROP TABLE clients").run();
// db.prepare("DROP TABLE licences").run();

const IS_NUMBER = (field) =>
  `CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;

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

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //
// LICENCES //

export const createLicencesTable = db
  .prepare(
    `CREATE TABLE IF NOT EXISTS licences(
    id INTEGER PRIMARY KEY,
    seller TEXT NOT NULL,
    moudjahid TEXT NOT NULL UNIQUE COLLATE NOCASE,
    wilaya TEXT NOT NULL,
    price INTEGER NOT NULL
      CHECK (price >= 4000) 
      ${IS_NUMBER("price")},
    attachments TEXT,
    FOREIGN KEY (seller)
     REFERENCES clients (fullName)
       ON UPDATE NO ACTION
       ON DELETE CASCADE
)`
  )
  .run();

export const getLicences = db.prepare(`SELECT * FROM licences`);

export const getLicenceById = db.prepare(
  `SELECT * FROM licences WHERE licences.id = ?`
);

export const createLicence = db.prepare(`INSERT INTO licences(
    seller,
    moudjahid,
    wilaya,
    price,
    attachments
) VALUES(?,?,?,?,?)`);

export const updateLicence = db.prepare(`UPDATE licences
 SET moudjahid = COALESCE(?, moudjahid),
 wilaya = COALESCE(?, wilaya),
 price = COALESCE(?, price)
 WHERE id = ?
`);

export const deleteLicenceById = db.prepare(`DELETE FROM licences
    WHERE id = ?`);

export const deleteLicences = db.prepare(`DELETE FROM licences`);
