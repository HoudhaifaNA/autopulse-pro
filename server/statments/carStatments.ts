import db from "../database";

db.prepare("DROP TABLE cars").run();

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
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    serialNumber TEXT NOT NULL UNIQUE,
    registrationNumber TEXT NOT NULL,
    keys INTEGER NOT NULL DEFAULT 1,
    mileage INTEGER NOT NULL DEFAULT 0,
    color TEXT NOT NULL,
    year TEXT NOT NULL,
    sellerId INTEGER NOT NULL,
    ownerId INTEGER NOT NULL,
    ownerName TEXT,
    costInEuros INTEGER ${IS_VALID_PRICE("costInEuros")},
    euroPrice INTEGER ${IS_VALID_PRICE("euroPrice")},
    purchasingPrice INTEGER NOT NULL ${IS_VALID_PRICE("purchasingPrice")},
    expenses TEXT,
    totalExpensesCost INTEGER ${IS_VALID_PRICE("totalExpensesCost")},
    totalEurosAmount INTEGER  ${IS_VALID_PRICE("totalEurosAmount")},
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
  datetime(cars.created_at,'localtime') AS created_at, 
  datetime(cars.updated_at,'localtime') AS updated_at
  FROM cars
  LEFT JOIN licences ON cars.ownerId > 0 AND cars.ownerId = licences.id
  INNER JOIN clients ON clients.id = cars.sellerId
  LEFT JOIN clients AS buyers ON buyers.id = cars.buyerId
`;

export const getCars = db.prepare(
  `${CAR_SELECT_STMT} ORDER BY created_at DESC`
);

export const getCarById = db.prepare(`${CAR_SELECT_STMT}
  WHERE cars.id = ?
`);

export const creatCar = db.prepare(`INSERT INTO cars(
  type,
  name,
  brand,
  model,
  serialNumber,
  registrationNumber,
  keys,
  mileage,
  color,
  year,
  sellerId, 
  ownerId,
  ownerName,
  costInEuros,
  euroPrice,
  purchasingPrice,
  expenses,
  totalExpensesCost,
  totalEurosAmount,
  totalCost,
  created_at
) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`);

export const updateCar = db.prepare(`UPDATE cars 
  SET updated_at = CURRENT_TIMESTAMP,
    ${optionalUpdate("name")},
    ${optionalUpdate("brand")},
    ${optionalUpdate("model")},
    ${optionalUpdate("serialNumber")},
    ${optionalUpdate("registrationNumber")},
    ${optionalUpdate("keys")},
    ${optionalUpdate("mileage")},
    ${optionalUpdate("color")}, 
    ${optionalUpdate("year")}, 
    ${optionalUpdate("costInEuros")}, 
    ${optionalUpdate("euroPrice")}, 
    ${optionalUpdate("purchasingPrice")}, 
    ${optionalUpdate("expenses")}, 
    ${optionalUpdate("totalExpensesCost")}, 
    ${optionalUpdate("totalEurosAmount")}, 
    ${optionalUpdate("totalCost")}
   WHERE id = ?
`);

export const sellCar = db.prepare(`UPDATE cars 
 SET buyerId = ?,
     soldPrice = ?
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
