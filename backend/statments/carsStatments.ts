import db from "../database";
import generateDeleteTranasctionTrigger from "../utils/generateDeleteTransactionTrigger";
import generateInsertedFields from "../utils/generateInsertedFields";
import { setOptionalUpdate } from "../utils/sqlValidations";

// db.prepare("DROP TABLE IF EXSITS cars").run();

const IS_LICENCE_INCOMPLETE = `
  CASE
    WHEN owner_id IS NOT NULL AND licence_price = 0 THEN 1
    ELSE 0
  END AS is_licence_incomplete
  `;

const IS_PURCHASE_PRICE_INCOMPLETE = `
  CASE
    WHEN purchase_price_dzd = 0 THEN 1
    ELSE 0
  END AS is_purchase_price_incomplete
  `;

const IS_EXPENSE_COST_INCOMPLETE = `
  CASE
    WHEN expense_cost = 0 THEN 1
    ELSE 0
  END AS is_expense_cost_incomplete
  `;

const IS_SOLD_PRICE_INCOMPLETE = `
  CASE
    WHEN buyer_id IS NOT NULL AND sold_price = 0 THEN 1
    ELSE 0
  END AS is_sold_price_incomplete
  `;

export const selectCarsListStatment = `
  SELECT 
  cars.id,
  ( cars.name || ' (' || cars.registration_number || ')' ) AS name,
  cars.color,
  buyers.full_name AS buyer,
  cars.owner_name
  FROM cars
  LEFT JOIN clients AS buyers ON buyers.id = cars.buyer_id

  `;

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
  ${IS_LICENCE_INCOMPLETE},
  ${IS_PURCHASE_PRICE_INCOMPLETE},
  ${IS_EXPENSE_COST_INCOMPLETE},
  ${IS_SOLD_PRICE_INCOMPLETE}
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
        IFNULL(B.total_cars, 0) AS total_cars,
        IFNULL(B.model, A.model) AS model,
        IFNULL(B.brand, A.brand) AS brand
  FROM (
      SELECT DISTINCT name, model, brand
      FROM cars
      WHERE brand = ?
  ) A
  LEFT JOIN (
      SELECT name, brand, model, COUNT(*) AS total_cars
      FROM cars
      --FILTER
      GROUP BY name, brand, model
  ) B ON A.name = B.name;
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
    papers_type = ?,
    has_procuration = ?,
    has_gray_card = ?,
    ${setOptionalUpdate("features")},
    ${setOptionalUpdate("seller_id")},
    owner_id = ?,
    ${setOptionalUpdate("owner_name")},
    ${setOptionalUpdate("licence_price")},
    ${setOptionalUpdate("purchase_price_eur")},
    ${setOptionalUpdate("eur_exchange_rate")},
    ${setOptionalUpdate("purchase_price_dzd")},
    is_exchange = ?,
    exchange_types = ?,
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
  papers_type = ?,
  has_procuration = ?,
  has_gray_card = ?,
  ${setOptionalUpdate("selling_details")},
  ${setOptionalUpdate("sold_price")},
  updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);

export const updateCarExpenses = db.prepare(`
  UPDATE cars
  SET ${setOptionalUpdate("expenses")},
  ${setOptionalUpdate("expense_cost")},
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

export const updateCarsExchangeRateStatment = db.prepare(`
  UPDATE cars
  SET eur_exchange_rate = ?,
  purchase_price_dzd = ?,
  expenses = ?,
  expense_cost = ?
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
