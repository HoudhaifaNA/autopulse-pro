import db from "../database";

// db.prepare("DROP TABLE users").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS users(
    username TEXT NOT NULL PRIMARY KEY COLLATE NOCASE,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)`
).run();

export const createUser = db.prepare(`INSERT INTO users(
    username,
    password
) VALUES(?,?)
`);

export const getUsers = db.prepare(`SELECT * FROM users`);

export const getUserById = db.prepare(
  `SELECT  username FROM users WHERE rowid = ?`
);

export const getUserByUsername = db.prepare(
  `SELECT username FROM users WHERE username = ?`
);

export const getUserPassword = db.prepare(
  `SELECT * FROM users WHERE username = ?`
);

export const updatePassword = db.prepare(`UPDATE users 
    SET password = ?,
    updated_at = CURRENT_TIMESTAMP
    WHERE username = ? 
`);

export const deleteUserById = db.prepare(`DELETE FROM users WHERE rowid = ?`);

export const deleteUsers = db.prepare(`DELETE FROM users`);
