import path from "path";
import Database from "better-sqlite3";

let dbPath = path.join(path.resolve(), "db", "db.db");
let newDBPath = path.join(path.resolve(), "db", "new_db.db");

const oldDB = new Database(dbPath, { verbose: null });
const db = new Database(newDBPath, { verbose: null });
if (oldDB.open) console.log("Connected DB First successfully");
if (db.open) console.log("Connected New DB successfully");

// db.prepare("DROP TABLE IF EXISTS licences").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS licences(
    id INTEGER NOT NULL PRIMARY KEY,
    purchase_date TEXT NOT NULL,
    seller_id INTEGER NOT NULL,
    moudjahid TEXT NOT NULL,
    wilaya TEXT,
    serial_number INTEGER,
    price INTEGER DEFAULT 0,
    attachments TEXT,
    car_id INTEGER,
    issue_date TEXT NOT NULL,
    expiration_date TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id)
     REFERENCES clients (id)
       ON UPDATE NO ACTION
       ON DELETE CASCADE
    FOREIGN KEY (car_id)
     REFERENCES cars (id)
       ON UPDATE NO ACTION
       ON DELETE SET NULL
)`
).run();

db.prepare(`ATTACH DATABASE ? AS 'old_db'`).run(dbPath);

// db.prepare(
//   `INSERT INTO licences(
//     id,
//     purchase_date,
//     seller_id,
//     moudjahid,
//     wilaya,
//     serial_number,
//     price,
//     attachments,
//     car_id,
//     issue_date,
//     expiration_date
//     )
//     SELECT
//         id,
//         datetime(created_at),
//         sellerId,
//         moudjahid,
//         wilaya,
//         serialNumber,
//         price,
//         attachments,
//         carId,
//         datetime(validUntil, '-5 years'),
//         datetime(validUntil)
//         FROM old_db.licences

// `
// ).run();

db.prepare(`DETACH DATABASE 'old_db'`).run();
