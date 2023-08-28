import db from "../database";
import generateDeleteTranasctionTrigger from "../utils/generateDeleteTransactionTrigger";
import generateInsertedFields from "../utils/generateInsertedFields";
import { checkNumber, setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXSITS cars").run();

const createCarsTableStatment = db.prepare(`
  CREATE TABLE IF NOT EXISTS cars(
    id INTEGER NOT NULL PRIMARY KEY,
    purchased_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    is_exchange INTEGER DEFAULT 0,
    exchange_types TEXT,
    expenses TEXT,
    expense_cost INTEGER ${checkNumber("expense_cost")},
    euro_cost INTEGER  ${checkNumber("euro_cost")},
    total_cost INTEGER AS (purchase_price_dzd + licence_price + expense_cost) STORED,
    buyer_id INTEGER,
    sold_at TEXT,
    given_keys INTEGER,
    papers_type TEXT,
    has_procuration INTEGER,
    has_gray_card INTEGER,
    procuration_received INTEGER,
    gray_card_received INTEGER,
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
      FOREIGN KEY (owner_id)
       REFERENCES licences (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    )
  `);

createCarsTableStatment.run();

const IS_INCOMPLETE = `
  CASE
    WHEN purchase_price_dzd = 0
      OR sold_price  = 0
      OR owner_id IS NOT NULL AND licence_price = 0
      THEN 1
    ELSE 0
  END AS is_incomplete
  `;

export const selectCarsWithPapersListStatment = db.prepare(`
  SELECT 
  cars.id,
  cars.name,
  cars.has_gray_card,
  cars.buyer_id,
  papers.id AS paper_exist
  FROM cars
  LEFT JOIN papers ON cars.id = papers.car_id
  WHERE has_gray_card = 1 AND buyer_id IS NOT NULL AND paper_exist IS NULL
  `);

export const selectCarsQuery = `
  SELECT cars.*,
  CASE
   WHEN cars.seller_id IS NOT NULL
    THEN sellers.full_name
    ELSE NULL
  END AS seller,
  CASE
   WHEN cars.buyer_id IS NOT NULL THEN buyers.full_name
   ELSE NULL
  END AS buyer,
  ${IS_INCOMPLETE}
  FROM cars
  LEFT JOIN clients AS sellers ON sellers.id = cars.seller_id
  LEFT JOIN clients AS buyers ON buyers.id = cars.buyer_id
  `;

export const selectCarByIdStatment = db.prepare(`
  ${selectCarsQuery}
  WHERE cars.id = ?
`);

export const selectCarsBrandsQuery = `
  SELECT IFNULL(B.brand, A.brand) AS brand,
  IFNULL(B.total_cars, 0) AS total_cars
  FROM (SELECT DISTINCT brand FROM cars) A
  LEFT JOIN (
    SELECT brand, COUNT(*) AS total_cars
    FROM cars
    --FILTER
    GROUP BY brand
  ) B ON A.brand = B.brand
`;

export const selectCarsNamesQuery = `
  SELECT IFNULL(B.name, A.name) AS name,
  IFNULL(B.total_cars, 0) AS total_cars
  FROM (SELECT DISTINCT name FROM cars WHERE brand = ?) A
  LEFT JOIN (
    SELECT name, COUNT(*) AS total_cars
    FROM cars
    --FILTER
    GROUP BY name
  ) B ON A.name = B.name
`;

export const selectPurchasedYearsStatment = db.prepare(`
    SELECT strftime('%Y', purchased_at) AS purchased_year
    FROM cars
    GROUP BY purchased_year
`);

export const selectSoldYearsStatment = db.prepare(`
    SELECT strftime('%Y', sold_at) AS sold_year
    FROM cars
    WHERE sold_at IS NOT NULL
    GROUP BY sold_year
`);

const INSERT_FIELDS = generateInsertedFields([
  "purchased_at",
  "type",
  "brand",
  "model",
  "serial_number",
  "registration_number",
  "second_registration_number",
  "color",
  "production_year",
  "keys",
  "mileage",
  "papers_type",
  "has_procuration",
  "has_gray_card",
  "features",
  "seller_id",
  "owner_id",
  "owner_name",
  "licence_price",
  "purchase_price_eur",
  "eur_exchange_rate",
  "purchase_price_dzd",
  "is_exchange",
  "exchange_types",
  "expenses",
  "expense_cost",
  "euro_cost",
]);

export const insertCarStatment = db.prepare(`
  INSERT INTO cars
  ${INSERT_FIELDS}
  `);

export const updateCarStatment = db.prepare(`
  UPDATE cars
  SET ${setOptionalUpdate("purchased_at")},
    ${setOptionalUpdate("type")},
    ${setOptionalUpdate("brand")},
    ${setOptionalUpdate("model")},
    ${setOptionalUpdate("serial_number")},
    ${setOptionalUpdate("registration_number")},
    ${setOptionalUpdate("second_registration_number")},
    ${setOptionalUpdate("color")},
    ${setOptionalUpdate("production_year")},
    ${setOptionalUpdate("keys")},
    ${setOptionalUpdate("mileage")},
    ${setOptionalUpdate("papers_type")},
    ${setOptionalUpdate("has_procuration")},
    ${setOptionalUpdate("has_gray_card")},
    ${setOptionalUpdate("features")},
    ${setOptionalUpdate("seller_id")},
    owner_id = ?,
    ${setOptionalUpdate("owner_name")},
    ${setOptionalUpdate("licence_price")},
    ${setOptionalUpdate("purchase_price_eur")},
    ${setOptionalUpdate("eur_exchange_rate")},
    ${setOptionalUpdate("purchase_price_dzd")},
    ${setOptionalUpdate("is_exchange")},
    ${setOptionalUpdate("exchange_types")},
    ${setOptionalUpdate("expenses")},
    ${setOptionalUpdate("expense_cost")},
    ${setOptionalUpdate("euro_cost")},
    updated_at = CURRENT_TIMESTAMP
   WHERE id = ?
`);

export const sellCarStatment = db.prepare(`
  UPDATE cars
    SET buyer_id = ?,
    sold_at = ?,
    given_keys = ?,
    ${setOptionalUpdate("papers_type")},
    ${setOptionalUpdate("has_procuration")},
    ${setOptionalUpdate("has_gray_card")},
    selling_details = ?,
    sold_price = ?,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
  `);

export const updateCarSaleStatment = db.prepare(`
  UPDATE cars
  SET ${setOptionalUpdate("buyer_id")},
  ${setOptionalUpdate("sold_at")},
  ${setOptionalUpdate("given_keys")},
  ${setOptionalUpdate("papers_type")},
  ${setOptionalUpdate("has_procuration")},
  ${setOptionalUpdate("has_gray_card")},
  ${setOptionalUpdate("selling_details")},
  ${setOptionalUpdate("sold_price")},
  updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);

export const cancelCarSaleStatment = db.prepare(`
  UPDATE cars
    SET buyer_id = null,
    sold_at = null,
    given_keys = null,
    selling_details = null,
    sold_price = null,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);

export const deleteCarsByIdQuery = `
  DELETE FROM cars
  WHERE id IN
  `;

export const deleteAllCarsStatment = db.prepare(`DELETE FROM cars`);

export const deletePurchasedCarTransactionsTrigger = db.prepare(`
  ${generateDeleteTranasctionTrigger("cars", "entrante", "car", "delete_purchased_cars_transactions")}
  `);

export const deleteSoldCarTransactionsTrigger = db.prepare(`
  ${generateDeleteTranasctionTrigger("cars", "sortante", "car", "delete_sold_cars_transactions")}
  `);

const deleteCarTransactionOnCancelSale = db.prepare(`
  CREATE TRIGGER IF NOT EXISTS delete_car_transaction_on_cancel_sale
  AFTER UPDATE OF buyer_id ON cars
  FOR EACH ROW
  WHEN NEW.buyer_id IS NULL
  BEGIN
    DELETE FROM transactions
    WHERE product_id = NEW.id AND direction = 'sortante' AND type = 'car';
  END;
  `);

deletePurchasedCarTransactionsTrigger.run();
deleteSoldCarTransactionsTrigger.run();
deleteCarTransactionOnCancelSale.run();
