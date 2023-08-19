import path from "path";
import Database from "better-sqlite3";

let dbPath = path.join(path.resolve(), "db", "db.db");
let newDBPath = path.join(path.resolve(), "db", "new_db.db");

const oldDB = new Database(dbPath, { verbose: null });
const db = new Database(newDBPath, { verbose: null });
if (oldDB.open) console.log("Connected DB First successfully");
if (db.open) console.log("Connected New DB successfully");

// db.prepare("DROP TABLE IF EXISTS users").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS users(
      username TEXT NOT NULL PRIMARY KEY COLLATE NOCASE,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`
).run();

db.prepare(`ATTACH DATABASE ? AS 'old_db'`).run(dbPath);

// db.prepare(
//   `INSERT INTO users(
//     username,
//     password
//     )
//     SELECT
//     username,
//     password
//     FROM old_db.users
// `
// ).run();

db.prepare(`DETACH DATABASE 'old_db'`).run();
