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
  `CREATE TABLE IF NOT EXISTS cars(
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    brand TEXT NOT NULL,
    serie TEXT NOT NULL,
    model TEXT NOT NULL,
    serialNumber TEXT NOT NULL UNIQUE,
    registrationNumber TEXT NOT NULL,
    color TEXT NOT NULL,
    year TEXT NOT NULL,
    sellerId INTEGER NOT NULL,
    licenceId INTEGER NOT NULL,
    costInEuros INTEGER ${IS_VALID_PRICE("costInEuros")},
    euroPrice INTEGER ${IS_VALID_PRICE("euroPrice")},
    purchasingPrice INTEGER NOT NULL ${IS_VALID_PRICE("purchasingPrice")},
    expenses TEXT,
    totalEurosAmount INTEGER NOT NULL ${IS_VALID_PRICE("totalEurosAmount")},
    totalCost INTEGER NOT NULL ${IS_VALID_PRICE("totalCost")},
    buyerId INTEGER,
    soldPrice INTEGER NOT NULL DEFAULT 0 ${IS_VALID_PRICE("soldPrice")} ,
    profit INTEGER AS (CASE WHEN soldPrice != 0 THEN soldPrice - totalCost ELSE 0 END) STORED,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sellerId)
       REFERENCES clients (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
      FOREIGN KEY (licenceId)
       REFERENCES licences (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
      FOREIGN KEY (buyerId)
        REFERENCES clients (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)`
).run();

const SELECT_STMT = `SELECT cars.*, 
  moudjahid,
  licences.price AS licencePrice,
  clients.fullName AS seller,
  CASE WHEN cars.buyerId IS NULL THEN NULL ELSE buyers.fullName END AS buyer,
  datetime(cars.created_at,'localtime') AS created_at, 
  datetime(cars.updated_at,'localtime') AS updated_at
  FROM cars
  INNER JOIN licences ON licences.id = licenceId
  INNER JOIN clients ON clients.id = cars.sellerId
  LEFT JOIN clients AS buyers ON buyers.id = cars.buyerId
`;

export const getCars = db.prepare(SELECT_STMT);

export const getCarById = db.prepare(`${SELECT_STMT}
  WHERE cars.id = ?
`);

export const creatCar = db.prepare(`INSERT INTO cars(
  type,
  brand,
  serie,
  model,
  serialNumber,
  registrationNumber,
  color,
  year,
  sellerId, 
  licenceId,
  costInEuros,
  euroPrice,
  purchasingPrice,
  expenses,
  totalEurosAmount,
  totalCost
) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`);

export const updateCar = db.prepare(`UPDATE cars 
  SET updated_at = CURRENT_TIMESTAMP,
    ${optionalUpdate("brand")},
    ${optionalUpdate("serie")},
    ${optionalUpdate("model")},
    ${optionalUpdate("serialNumber")},
    ${optionalUpdate("registrationNumber")},
    ${optionalUpdate("color")}, 
    ${optionalUpdate("year")}, 
    ${optionalUpdate("costInEuros")}, 
    ${optionalUpdate("euroPrice")}, 
    ${optionalUpdate("purchasingPrice")}, 
    ${optionalUpdate("expenses")}, 
    ${optionalUpdate("totalEurosAmount")}, 
    ${optionalUpdate("totalCost")}
   WHERE id = ?
`);

export const sellCar = db.prepare(`UPDATE cars 
 SET buyerId = ?,
     soldPrice = ?
     WHERE id = ?
 `);

export const deleteCarById = db.prepare(`DELETE FROM cars WHERE id = ?`);

export const deleteAllCars = db.prepare(`DELETE FROM cars`);

// onInserCarTrigger
db.prepare(
  `CREATE TRIGGER IF NOT EXISTS setCarId
    AFTER INSERT ON cars
    FOR EACH ROW
      BEGIN
        UPDATE licences
        SET carId = NEW.id
        WHERE licences.id = NEW.licenceId ;
      END;`
).run();
