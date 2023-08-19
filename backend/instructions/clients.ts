// import path from "path";
// import Database from "better-sqlite3";

// import { checkNumber } from "../utils/sqlValidations";

// let dbPath = path.join(path.resolve(), "db", "db.db");
// let newDBPath = path.join(path.resolve(), "db", "new_db.db");

// const oldDB = new Database(dbPath, { verbose: null });
// const db = new Database(newDBPath, { verbose: null });
// if (oldDB.open) console.log("Connected DB First successfully");
// if (db.open) console.log("Connected New DB successfully");

// // db.prepare("DROP TABLE IF EXISTS clients").run();

// Last transaction date and on insert set transaction MAX

// db.prepare(
//   `CREATE TABLE IF NOT EXISTS clients(
//     id INTEGER NOT NULL PRIMARY KEY,
//     full_name TEXT NOT NULL UNIQUE COLLATE NOCASE,
//     phone TEXT COLLATE NOCASE,
//     email TEXT COLLATE NOCASE,
//     address TEXT,
//     eur_balance NUMERIC NOT NULL DEFAULT 0 ${checkNumber("eur_balance")},
//     dzd_balance NUMERIC NOT NULL DEFAULT 0 ${checkNumber("dzd_balance")},
//     created_at TEXT DEFAULT CURRENT_TIMESTAMP,
//     updated_at TEXT DEFAULT CURRENT_TIMESTAMP
// )`
// ).run();

// db.prepare(`ATTACH DATABASE ? AS 'old_db'`).run(dbPath);
// db.prepare(
//   `INSERT INTO clients(
//     id,
//     full_name,
//     phone,
//     email,
//     address,
//     eur_balance,
//     dzd_balance
//     )
//     SELECT
//     id,
//     fullName,
//     phoneNumber,
//     '',
//     '',
//     balance,
//     0
//     FROM old_db.clients WHERE clientType = 'euro'
//    `
// ).run();
// db.prepare(
//   `INSERT INTO clients(
//     id,
//     full_name,
//     phone,
//     email,
//     address,
//     eur_balance,
//     dzd_balance
//     )
//     SELECT
//     id,
//     fullName,
//     phoneNumber,
//     '',
//     '',
//     0,
//     balance
//     FROM old_db.clients WHERE clientType = 'DA'
//    `
// ).run();

// db.prepare(`DETACH DATABASE 'old_db'`).run();
