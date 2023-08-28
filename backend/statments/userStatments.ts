import db from "../database";

// db.prepare("DROP TABLE IF EXISTS users").run();

const createUsersTableStatment = db.prepare(`
  CREATE TABLE IF NOT EXISTS users(
  username TEXT NOT NULL PRIMARY KEY COLLATE NOCASE,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

createUsersTableStatment.run();

export const selectUsersStatment = db.prepare(`
  SELECT * FROM users
  `);

export const selectUsernameByIdStatment = db.prepare(`
  SELECT username, created_at, updated_at FROM users
  WHERE rowId = ?
  `);

export const selectUserByUsernameStatment = db.prepare(`
  SELECT * FROM users
  WHERE username = ?
  `);

export const selectUsernameStatment = db.prepare(`
  SELECT username, created_at, updated_at FROM users
  WHERE username = ?
  `);

export const insertUserStatment = db.prepare(`
  INSERT INTO users
  (username, password)
  VALUES(@username, @password)
  `);

export const updatePasswordStatment = db.prepare(`
  UPDATE users 
  SET password = ?,
  updated_at = CURRENT_TIMESTAMP
  WHERE username = ? 
  `);

export const deleteUserByIdStatment = db.prepare(`
  DELETE FROM users
  WHERE rowId = ?
  `);

export const deleteUsersStatment = db.prepare(`DELETE FROM users`);
