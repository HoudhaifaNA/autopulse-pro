import path from "path";
import Database from "better-sqlite3";

const isProd: boolean = process.env.NODE_ENV === "production";
let dbPath = path.join(path.resolve(), "db", "db.db");
if (isProd) dbPath = path.join(path.resolve(), "..", "..", "db/db.db");

const db = new Database(dbPath, { verbose: null });
const IS_VALID_PRICE = (field) => {
  return `
    CHECK (${field} >= 0)
    CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;
};
if (db.open) console.log("Connected successfully");
// db.prepare("ALTER TABLE cars RENAME TO cars_old").run();
// db.prepare(
//   ` CREATE TABLE IF NOT EXISTS cars(
//     id INTEGER PRIMARY KEY,
//     type TEXT NOT NULL CHECK (type IN ('locale', 'UAE', 'importé')),
//     name TEXT NOT NULL,
//     brand TEXT NOT NULL,
//     model TEXT NOT NULL,
//     serialNumber TEXT NOT NULL,
//     registrationNumber TEXT NOT NULL,
//     secondRegistrationNumber TEXT,
//     keys INTEGER NOT NULL DEFAULT 1,
//     mileage INTEGER NOT NULL DEFAULT 0,
//     color TEXT NOT NULL,
//     year TEXT NOT NULL,
//     features TEXT,
//     sellerId INTEGER NOT NULL,
//     ownerId INTEGER NOT NULL,
//     ownerName TEXT,
//     costInEuros INTEGER ${IS_VALID_PRICE("costInEuros")},
//     euroPrice INTEGER ${IS_VALID_PRICE("euroPrice")},
//     purchasingPrice INTEGER NOT NULL ${IS_VALID_PRICE("purchasingPrice")},
//     expenses TEXT,
//     totalExpensesCost INTEGER ${IS_VALID_PRICE("totalExpensesCost")},
//     totalEurosAmount INTEGER  ${IS_VALID_PRICE("totalEurosAmount")},
//     totalCost INTEGER NOT NULL ${IS_VALID_PRICE("totalCost")},
//     buyerId INTEGER,
//     soldPrice INTEGER NOT NULL DEFAULT 0 ${IS_VALID_PRICE("soldPrice")},
//     sold_date TEXT,
//     given_keys INTEGER,
//     folder TEXT,
//     procuration TEXT,
//     gray_card TEXT,
//     selling_details TEXT,
//     hasProcuration TEXT DEFAULT '',
//     profit INTEGER AS (CASE WHEN soldPrice != 0 THEN soldPrice - totalCost ELSE 0 END) STORED,
//     created_at TEXT DEFAULT CURRENT_TIMESTAMP,
//     updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (sellerId)
//        REFERENCES clients (id)
//         ON UPDATE NO ACTION
//         ON DELETE CASCADE,
//       FOREIGN KEY (buyerId)
//         REFERENCES clients (id)
//         ON UPDATE NO ACTION
//         ON DELETE CASCADE

// )`
// ).run();
// db.prepare(
//   `INSERT INTO cars (
//   id ,
//   type ,
//   name,
//   brand,
//   model,
//   serialNumber,
//   registrationNumber,
//   secondRegistrationNumber,
//   keys,
//   mileage,
//   color,
//   year,
//   features,
//   sellerId,
//   ownerId,
//   ownerName,
//   costInEuros ,
//   euroPrice ,
//   purchasingPrice  ,
//   expenses,
//   totalExpensesCost ,
//   totalEurosAmount ,
//   totalCost  ,
//   buyerId ,
//   soldPrice ,
//   sold_date,
//   given_keys ,
//   folder,
//   procuration,
//   gray_card,
//   selling_details,
//   hasProcuration,
//   created_at,
//   updated_at )
// SELECT
//   id ,
//   type ,
//   name,
//   brand,
//   model,
//   serialNumber,
//   registrationNumber,
//   secondRegistrationNumber,
//   keys,
//   mileage,
//   color,
//   year,
//   features,
//   sellerId,
//   ownerId,
//   ownerName,
//   costInEuros ,
//   euroPrice ,
//   purchasingPrice  ,
//   expenses,
//   totalExpensesCost ,
//   totalEurosAmount ,
//   totalCost  ,
//   buyerId ,
//   soldPrice ,
//   sold_date,
//   given_keys ,
//   folder,
//   procuration,
//   gray_card,
//   selling_details,
//   hasProcuration,
//   created_at,
//   updated_at FROM cars_old `
// ).run();

// db.prepare("ALTER TABLE cars ADD COLUMN gray_card TEXT DEFAULT 'false'").run();
// db.pragma("foreign_keys = OFF");
// db.prepare("DROP TABLE papers").run();
// db.prepare("DROP TABLE cars_new").run();
// db.prepare("DROP TRIGGER setCarProcurationOnDelete").run();
// db.prepare("ALTER TABLE cars_new RENAME TO cars ").run();
export default db;
