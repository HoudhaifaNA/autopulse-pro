/*  CLIENTS 
 1- GET ONE AND GET ALL (DONE)
 2- UPDATE ONE PHONE NUMBER AND NAME (DONE)
 3- DELETE ONE OR DELETE ALL (DONE)
 4- CHANGE BALANCE (DONE)

*/
export const CREATE_CLIENTS_TABLE = `CREATE TABLE IF NOT EXISTS clients(
    id INTEGER NOT NULL PRIMARY KEY,
    fullName TEXT NOT NULL UNIQUE COLLATE NOCASE,
    phoneNumber TEXT NOT NULL UNIQUE,
    balance INTEGER NOT NULL
    CHECK (fullName != '')
)`;

export const CREATE_A_CLIENT = `INSERT INTO clients(
    fullName,
    phoneNumber,
    balance
) VALUES (?,?,?)`;

export const GET_ALL_CLIENTS = `SELECT * FROM clients`;

export const GET_CLIENT_BY_ID = `SELECT * FROM clients WHERE id = ?`;

export const UPDATE_CLIENT = `UPDATE clients 
    SET fullName = COALESCE(?, fullName),
    phoneNumber = COALESCE(?, phoneNumber),
    balance = COALESCE(balance + ?, balance)
    WHERE id = ? `;

export const DELETE_CLIENT_BY_ID = `DELETE FROM clients WHERE id = ?`;

export const DELETE_CLIENTS = `DELETE FROM clients`;

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //
// LICENCES //

export const CREATE_LICENCES_TABLE = `CREATE TABLE IF NOT EXISTS licences(
    id INTEGER PRIMARY KEY,
    seller INTEGER NOT NULL,
    moudjahid TEXT NOT NULL UNIQUE COLLATE NOCASE,
    wilaya TEXT NOT NULL,
    price INTEGER NOT NULL CHECK (price >= 4000),
    CHECK (moudjahid != '')
    FOREIGN KEY (seller)
     REFERENCES clients (id)
       ON UPDATE NO ACTION
       ON DELETE CASCADE
)`;

export const GET_ALL_LICENCES = `SELECT licences.*, clients.fullName AS sellerName
FROM licences
JOIN clients ON licences.seller = clients.id
`;

export const GET_LICENCE_BY_ID = `${GET_ALL_LICENCES} WHERE licences.id = ?`;

export const CREATE_LICENCE = `INSERT INTO licences(
    seller,
    moudjahid,
    wilaya,
    price
) VALUES(?,?,?,?)`;

export const UPDATE_LICENCE = `UPDATE licences
 SET moudjahid = COALESCE(?, moudjahid),
 wilaya = COALESCE(?, wilaya),
 price = COALESCE(?, price)
 WHERE id = ?
`;

export const DELETE_LICENCE_BY_ID = `DELETE FROM licences
    WHERE id = ?`;

export const DELETE_LICENCES = `DELETE FROM licences`;
