import path from "path";
import Database from "better-sqlite3";
import { checkNumber } from "../utils/sqlValidations";

let dbPath = path.join(path.resolve(), "db", "db.db");
let newDBPath = path.join(path.resolve(), "db", "new_db.db");

const oldDB = new Database(dbPath, { verbose: null });
const db = new Database(newDBPath, { verbose: null });
if (oldDB.open) console.log("Connected DB First successfully");
if (db.open) console.log("Connected New DB successfully");

// db.prepare("DROP TABLE IF EXISTS expenses").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS expenses(
      id INTEGER NOT NULL PRIMARY KEY,
      expense_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      raison TEXT NOT NULL,
      cost INTEGER NOT NULL ${checkNumber("cost")},
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`
).run();

db.prepare(`ATTACH DATABASE ? AS 'old_db'`).run(dbPath);

// db.prepare(
//   `INSERT INTO expenses(
//       id ,
//       expense_date,
//       raison,
//       cost
//     )
//     SELECT
//         id,
//         datetime(transferred_at),
//         raison,
//         amount
//         FROM old_db.expenses

// `
// ).run();

db.prepare(`DETACH DATABASE 'old_db'`).run();
