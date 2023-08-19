import path from "path";
import Database from "better-sqlite3";
import { checkNumber } from "../utils/sqlValidations";

let newDBPath = path.join(path.resolve(), "db", "new_db.db");

const db = new Database(newDBPath, { verbose: null });
if (db.open) console.log("Connected New DB successfully");

// db.prepare("DROP TABLE IF EXISTS papers").run();
// db.prepare("DROP TABLE IF EXISTS procurations").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS papers(
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL CHECK (type IN ('transaction', 'expense')),
        purchase_date TEXT DEFAULT CURRENT_TIMESTAMP,
        seller_id INTEGER NOT NULL,
        car_id INTEGER NOT NULL UNIQUE,
        owner_name TEXT NOT NULL,
        price INTEGER DEFAULT 0 ${checkNumber("price")},
        deal_id INTEGER NOT NULL,
        issued_date TEXT NOT NULL,
        received_date TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id)
         REFERENCES clients (id)
           ON UPDATE NO ACTION
           ON DELETE CASCADE
        FOREIGN KEY (car_id)
         REFERENCES cars (id)
           ON UPDATE NO ACTION
           ON DELETE CASCADE
    )`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS procurations(
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL CHECK (type IN ('transaction', 'expense')),
        purchase_date TEXT DEFAULT CURRENT_TIMESTAMP,
        seller_id INTEGER NOT NULL,
        licence_id INTEGER NOT NULL,
        car_id INTEGER NOT NULL UNIQUE,
        owner_id INTEGER NOT NULL, 
        price INTEGER DEFAULT 0 ${checkNumber("price")},
        issued_date TEXT NOT NULL,
        received_date TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id)
         REFERENCES clients (id)
           ON UPDATE NO ACTION
           ON DELETE CASCADE
        FOREIGN KEY (owner_id)
         REFERENCES clients (id)
           ON UPDATE NO ACTION
           ON DELETE CASCADE
        FOREIGN KEY (car_id)
         REFERENCES cars (id)
           ON UPDATE NO ACTION
           ON DELETE CASCADE
    )`
).run();
