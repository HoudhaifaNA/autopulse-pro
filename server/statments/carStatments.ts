import db from "../database";

// db.prepare("DROP TABLE cars").run();

const IS_VALID_PRICE = (field) => {
  return `
  CHECK (${field} >= 0)
  CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;
};

const optionalUpdate = (field) => {
  return `${field} = COALESCE(?, ${field})`;
};

db.prepare(
  ` CREATE TABLE IF NOT EXISTS cars(
      id INTEGER PRIMARY KEY,
      type TEXT NOT NULL CHECK (type IN ('locale', 'UAE', 'importé')),
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      serialNumber TEXT NOT NULL,
      registrationNumber TEXT NOT NULL,
      secondRegistrationNumber TEXT,
      keys INTEGER NOT NULL DEFAULT 1,
      mileage INTEGER NOT NULL DEFAULT 0,
      color TEXT NOT NULL,
      year TEXT NOT NULL,
      features TEXT,
      sellerId INTEGER NOT NULL,
      ownerId INTEGER NOT NULL,
      ownerName TEXT,
      costInEuros INTEGER ${IS_VALID_PRICE("costInEuros")},
      euroPrice INTEGER ${IS_VALID_PRICE("euroPrice")},
      purchasingPrice INTEGER NOT NULL ${IS_VALID_PRICE("purchasingPrice")},
      isExchange TEXT DEFAULT 'false',
      exchangeTypes TEXT,
      expenses TEXT,
      totalExpensesCost INTEGER ${IS_VALID_PRICE("totalExpensesCost")},
      totalEurosAmount INTEGER  ${IS_VALID_PRICE("totalEurosAmount")},
      totalCost INTEGER NOT NULL ${IS_VALID_PRICE("totalCost")},
      buyerId INTEGER,
      soldPrice INTEGER NOT NULL DEFAULT 0 ${IS_VALID_PRICE("soldPrice")},
      sold_date TEXT,
      given_keys INTEGER,
      folder TEXT,
      procuration TEXT,
      gray_card TEXT,
      selling_details TEXT,
      hasProcuration TEXT DEFAULT '',
      profit INTEGER AS (CASE WHEN buyerId != 0 THEN soldPrice - totalCost ELSE 0 END) STORED,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sellerId)
         REFERENCES clients (id)
          ON UPDATE NO ACTION
          ON DELETE CASCADE,
        FOREIGN KEY (buyerId)
          REFERENCES clients (id)
          ON UPDATE NO ACTION
          ON DELETE CASCADE

  )`
).run();

export const CAR_SELECT_STMT = `SELECT cars.*, 
  CASE WHEN moudjahid IS NOT NULL THEN moudjahid ELSE ownerName END AS ownerName,
  licences.price AS licencePrice,
  clients.fullName AS seller,
  CASE WHEN cars.buyerId IS NULL THEN NULL ELSE buyers.fullName END AS buyer,
  CASE
  WHEN purchasingPrice = 0 OR buyerId IS NOT NULL AND soldPrice  = 0 OR type != 'locale' AND euroPrice = 0 OR ownerId > 0 AND licences.price = 0 OR totalExpensesCost = 0 THEN 'Missing fields' 
  ELSE 'Good status'
  END AS fields_status,
  datetime(cars.created_at,'localtime') AS created_at, 
  datetime(cars.updated_at,'localtime') AS updated_at
  FROM cars
  LEFT JOIN licences ON cars.ownerId > 0 AND cars.ownerId = licences.id
  INNER JOIN clients ON clients.id = cars.sellerId
  LEFT JOIN clients AS buyers ON buyers.id = cars.buyerId
`;

export const getCarsCount = db.prepare(
  `SELECT COUNT(*) as total_rows FROM cars`
);

export const getCarsByBrand = `
${CAR_SELECT_STMT.replace(
  "SELECT cars.*,",
  "SELECT cars.*, cars.model AS name, strftime('%Y', date(cars.created_at)) AS serie,"
)}
     WHERE  LOWER(TRIM(cars.brand)) = ?
`;

export const getCarsByName = `${CAR_SELECT_STMT.replace(
  "SELECT cars.*,",
  "SELECT cars.*, cars.model AS name, strftime('%Y', date(cars.created_at)) AS serie,"
)}
       WHERE LOWER(TRIM(cars.name)) = ? 
`;
export const getCarsBrands = db.prepare(`
SELECT brand,
COUNT(id) AS count
    FROM cars
     GROUP BY LOWER(TRIM(brand))
     ORDER BY brand 
`);
export const getBrandModels = db.prepare(`
    SELECT brand, model,
    COUNT(id) AS count
    FROM cars
    WHERE LOWER(TRIM(brand)) = ? COLLATE NOCASE
     GROUP BY LOWER(TRIM(model))
     ORDER BY model
`);
export const getCarById = db.prepare(`${CAR_SELECT_STMT}
  WHERE cars.id = ?
`);

export const getCarsSeries = db.prepare(
  `SELECT strftime('%Y', created_at) AS serie, COUNT(*) AS count
    FROM cars
    GROUP BY serie
`
);

export const getCarsBySerie = db.prepare(`${CAR_SELECT_STMT} 
    WHERE strftime('%Y', cars.created_at) = ?
`);

export const creatCar = db.prepare(`INSERT INTO cars(
  type,
  name,
  brand,
  model,
  serialNumber,
  registrationNumber,
  secondRegistrationNumber,
  keys,
  mileage,
  color,
  year,
  features,
  sellerId, 
  ownerId,
  ownerName,
  costInEuros,
  euroPrice,
  purchasingPrice,
  isExchange,
  exchangeTypes,
  expenses,
  totalExpensesCost,
  totalEurosAmount,
  totalCost,
  created_at
) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`);

export const updateCar = db.prepare(`UPDATE cars 
  SET updated_at = CURRENT_TIMESTAMP,
    ${optionalUpdate("type")},
    ${optionalUpdate("name")},
    ${optionalUpdate("brand")},
    ${optionalUpdate("model")},
    ${optionalUpdate("serialNumber")},
    ${optionalUpdate("registrationNumber")},
    ${optionalUpdate("secondRegistrationNumber")},
    ${optionalUpdate("keys")},
    ${optionalUpdate("mileage")},
    ${optionalUpdate("color")}, 
    ${optionalUpdate("year")}, 
    ${optionalUpdate("created_at")}, 
    ${optionalUpdate("features")}, 
    ${optionalUpdate("sellerId")}, 
    ${optionalUpdate("costInEuros")}, 
    ${optionalUpdate("euroPrice")}, 
    ${optionalUpdate("purchasingPrice")}, 
    ${optionalUpdate("isExchange")}, 
    ${optionalUpdate("exchangeTypes")}, 
    ${optionalUpdate("expenses")}, 
    ${optionalUpdate("totalExpensesCost")}, 
    ${optionalUpdate("totalEurosAmount")}, 
    ${optionalUpdate("totalCost")}
   WHERE id = ?
`);

export const sellCar = db.prepare(`UPDATE cars 
SET buyerId = ?,
soldPrice = ?,
sold_date = ?,
given_keys = ?,
folder = ?,
procuration = ?,
gray_card = ?,
selling_details = ?
WHERE id = ?
`);

export const updateSoldPrice = db.prepare(`UPDATE cars 
  SET updated_at = CURRENT_TIMESTAMP,
  ${optionalUpdate("soldPrice")},
  ${optionalUpdate("sold_date")},
  ${optionalUpdate("given_keys")},
  ${optionalUpdate("folder")},
  ${optionalUpdate("procuration")},
  ${optionalUpdate("gray_card")},
  ${optionalUpdate("selling_details")}
  WHERE id = ?
`);

export const unsoldCar = db.prepare(`UPDATE cars 
SET updated_at = CURRENT_TIMESTAMP,
soldPrice = 0,
buyerId = null,
sold_date = null,
given_keys = null,
folder = null,
procuration = 'false',
gray_card = 'false',
selling_details = null
WHERE id = ?
`);

export const deleteCarById = `DELETE FROM cars WHERE id IN `;

export const deleteAllCars = db.prepare(`DELETE FROM cars`);

// onInserCarTrigger
db.prepare(
  `CREATE TRIGGER IF NOT EXISTS setCarId
    AFTER INSERT ON cars
    WHEN NEW.ownerId > 0
      BEGIN
        UPDATE licences
        SET carId = NEW.id
        WHERE licences.id = NEW.ownerId ;
      END;`
).run();

// db.prepare(`ALTER TABLE cars ADD COLUMN given_keys INTEGER`).run();
// db.prepare(`ALTER TABLE cars ADD COLUMN folder TEXT`).run();
// db.prepare(`ALTER TABLE cars ADD COLUMN procuration TEXT`).run();
// db.prepare(`ALTER TABLE cars ADD COLUMN selling_details TEXT`).run();
// db.prepare(`ALTER TABLE cars ADD COLUMN hasProcuration TEXT`).run();
// db.prepare(`UPDATE cars SET hasProcuration = 'false' `).run();
db.prepare(
  `CREATE TRIGGER IF NOT EXISTS setCarProcuration
      AFTER INSERT ON procurations
      FOR EACH ROW
        BEGIN
          UPDATE cars
          SET hasProcuration = 'true'
          WHERE cars.id = NEW.carId ;
        END;`
).run();
db.prepare(
  `CREATE TRIGGER IF NOT EXISTS setCarProcurationOnDelete
      AFTER DELETE ON procurations
      FOR EACH ROW
        BEGIN
          UPDATE cars
          SET hasProcuration = 'false'
          WHERE cars.id = OLD.carId ;
        END;`
).run();
