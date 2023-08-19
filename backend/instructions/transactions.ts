import path from "path";
import Database from "better-sqlite3";
import { checkNumber } from "../utils/sqlValidations";

let dbPath = path.join(path.resolve(), "db", "db.db");
let newDBPath = path.join(path.resolve(), "db", "new_db.db");

const oldDB = new Database(dbPath);
const db = new Database(newDBPath);
if (oldDB.open) console.log("Connected DB First successfully");
if (db.open) console.log("Connected New DB successfully");

// db.prepare("DROP TABLE IF EXISTS transactions").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS transactions(
      id INTEGER NOT NULL PRIMARY KEY,
      client_id INTEGER NOT NULL,
      transaction_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      type TEXT NOT NULL CHECK (type IN ('car', 'licence', 'procuration', 'paper', 'Fiat')),
      product_id INTEGER,
      info1 TEXT NOT NULL,
      info2 TEXT NOT NULL,
      info3 TEXT,
      info4 TEXT,
      direction TEXT NOT NULL CHECK (direction IN ('sortante', 'entrante')),
      currency TEXT NOT NULL CHECK (currency IN ('DZD', 'EUR')),
      amount INTEGER NOT NULL ${checkNumber("amount")},
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (product_id, type, direction),
      FOREIGN KEY (client_id)
       REFERENCES clients (id)
       ON UPDATE NO ACTION
       ON DELETE CASCADE
  )`
).run();

db.prepare(`ATTACH DATABASE ? AS 'old_db'`).run(dbPath);

// db.prepare(
//   `INSERT INTO transactions(
//     id,
//     client_id,
//     transaction_date,
//     type,
//     product_id,
//     info1,
//     info2,
//     info3,
//     info4,
//     direction,
//     currency,
//     amount
//     )
//     SELECT
//     t.id,
//     t.clientId,
//     datetime(t.date),
//     CASE
//         WHEN t.type = 'DA' OR t.type = 'euro' THEN 'Fiat'
//         ELSE t.type
//     END,
//     t.productId,
//     t.info1,
//     t.info2,
//     t.info3,
//     t.info4,
//     t.direction,
//     CASE
//         WHEN c.clientType = 'DA' THEN 'DZD'
//         ELSE 'EUR'
//     END,
//     CASE
//         WHEN t.direction = 'sortante' THEN -t.total
//         WHEN t.direction = 'entrante' THEN t.total
//         ELSE 0
//     END
//     FROM old_db.transactions AS t
//     JOIN old_db.clients AS c ON t.clientId = c.id;

// `
// ).run();

db.prepare(`DETACH DATABASE 'old_db'`).run();
