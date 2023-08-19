import path from "path";
import Database from "better-sqlite3";
import { checkNumber } from "../utils/sqlValidations";

let dbPath = path.join(path.resolve(), "db", "db.db");
let newDBPath = path.join(path.resolve(), "db", "new_db.db");

const oldDB = new Database(dbPath);
const db = new Database(newDBPath);
if (oldDB.open) console.log("Connected DB First successfully");
if (db.open) console.log("Connected New DB successfully");

/**   CARS
 *
 *
 */

// db.prepare("DROP TABLE IF EXISTS cars").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS cars(
          id INTEGER NOT NULL PRIMARY KEY,
          purchase_date TEXT NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('locale', 'dubai', 'europe')),
          brand TEXT NOT NULL,
          model TEXT NOT NULL,
          name TEXT AS (brand || ' ' || model) STORED,
          serial_number TEXT NOT NULL,
          registration_number TEXT NOT NULL,
          second_registration_number TEXT '',
          keys INTEGER NOT NULL DEFAULT 1,
          mileage INTEGER NOT NULL DEFAULT 0,
          color TEXT NOT NULL,
          production_year TEXT NOT NULL,
          features TEXT,
          seller_id INTEGER NOT NULL,
          owner_id INTEGER,
          owner_name TEXT,
          licence_price INTEGER,
          purchase_price_eur INTEGER ${checkNumber("purchase_price_eur")},
          eur_exchange_rate INTEGER ${checkNumber("eur_exchange_rate")},
          purchase_price_dzd INTEGER NOT NULL ${checkNumber("purchase_price_dzd")},
          is_exchange TEXT DEFAULT 0,
          exchange_types TEXT,
          expenses TEXT,
          expense_cost INTEGER ${checkNumber("expense_cost")},
          euro_cost INTEGER  ${checkNumber("euro_cost")},
          total_cost INTEGER AS (purchase_price_dzd + licence_price + expense_cost) STORED,
          buyer_id INTEGER,
          sold_date TEXT,
          given_keys INTEGER,
          papers_type TEXT,
          has_procuration INTEGER,
          procuration_received INTEGER,
          has_gray_card INTEGER,
          selling_details TEXT,
          sold_price INTEGER,
          profit INTEGER AS (CASE WHEN buyer_id IS NOT NULL THEN sold_price - total_cost ELSE NULL END) STORED,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (seller_id)
             REFERENCES clients (id)
              ON UPDATE NO ACTION
              ON DELETE CASCADE,
            FOREIGN KEY (buyer_id)
              REFERENCES clients (id)
              ON UPDATE NO ACTION
              ON DELETE CASCADE
    
      )`
).run();

db.prepare(`ATTACH DATABASE ? AS 'old_db'`).run(dbPath);

// const insertCars = db.prepare(
//   `INSERT INTO cars(
//           id,
//           purchase_date,
//           type,
//           brand,
//           model,
//           serial_number,
//           registration_number,
//           second_registration_number,
//           keys,
//           mileage,
//           color,
//           production_year,
//           features,
//           seller_id,
//           owner_id,
//           owner_name,
//           licence_price,
//           purchase_price_eur,
//           eur_exchange_rate,
//           purchase_price_dzd,
//           is_exchange,
//           expenses,
//           expense_cost,
//           euro_cost,
//           buyer_id,
//           sold_date,
//           given_keys,
//           papers_type,
//           has_procuration,
//           procuration_received,
//           has_gray_card,
//           sold_price
//         )
//       SELECT
//       id,
//       datetime(created_at),
//       ?,
//       brand,
//       model,
//       serialNumber,
//       registrationNumber,
//       CASE
//           WHEN secondRegistrationNumber IS NOT NULL THEN secondRegistrationNumber
//           ELSE ''
//       END,
//       keys,
//       mileage,
//       color,
//       year,
//       features,
//       sellerId,
//       ownerId,
//       ownerName,
//       0,
//       costInEuros,
//       euroPrice,
//       purchasingPrice,
//       CASE
//           WHEN isExchange = 'true' THEN 1
//           WHEN isExchange = 'false' THEN 0
//           ELSE 0
//       END,
//       expenses,
//       totalExpensesCost,
//       totalEurosAmount,
//       buyerId,
//       datetime(sold_date),
//       given_keys,
//       folder,
//       CASE
//       WHEN buyerId IS NOT NULL THEN
//           CASE
//               WHEN procuration = 'true' THEN 1
//               WHEN procuration = 'false' THEN 0
//               ELSE 0
//           END
//        ELSE NULL
//       END,
//       CASE
//           WHEN buyerId IS NOT NULL THEN 0
//           ELSE NULL
//       END,
//       CASE
//       WHEN buyerId IS NOT NULL THEN
//           CASE
//               WHEN gray_card = 'true' THEN 1
//               WHEN gray_card = 'false' THEN 0
//               ELSE NULL
//           END
//        ELSE NULL
//       END,
//       CASE
//           WHEN buyerId IS NOT NULL THEN soldPrice
//           ELSE NULL
//       END
//       FROM old_db.cars
//       WHERE type = ?
//       `
// );
// insertCars.run(["locale", "locale"]);
// insertCars.run(["dubai", "UAE"]);
// db.prepare(
//   `UPDATE cars
//     SET licence_price = (
//     SELECT price
//     FROM old_db.licences
//     WHERE old_db.licences.id = cars.owner_id AND cars.owner_id > 0
// )
// WHERE EXISTS (
//     SELECT 1
//     FROM old_db.licences
//     WHERE old_db.licences.id = cars.owner_id AND cars.owner_id > 0
// );`
// ).run();
db.prepare(`DETACH DATABASE 'old_db'`).run();
