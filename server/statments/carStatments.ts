import db from "../database";

const IS_NUMBER = (field) =>
  `CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;
// db.prepare("DROP TABLE cars").run();

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
    seller TEXT NOT NULL, 
    licenceId INTEGER NOT NULL,
    costInEuro INTEGER,
    euroPrice INTEGER,
    purchasingPrice INTEGER NOT NULL,
    expenses TEXT,
    totalEurosAmount INTEGER NOT NULL,
    totalCost INTEGER NOT NULL,
    soldPrice INTEGER ,
    profit INTEGER AS (CASE WHEN soldPrice IS NOT NULL THEN soldPrice - purchasingPrice ELSE 0 END) STORED,
    buyer TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (seller)
       REFERENCES clients (fullName)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
      FOREIGN KEY (licenceId)
       REFERENCES licences (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
      FOREIGN KEY (buyer)
        REFERENCES clients (fullName)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)`
).run();

export const getCars = db.prepare(`SELECT  
*,
datetime(created_at,'localtime') AS created_at, 
datetime(updated_at,'localtime') AS updated_at
FROM cars`);

export const getCarById =
  db.prepare(`SELECT cars.*, moudjahid, licences.price AS licencePrice 
  FROM cars
  INNER JOIN licences on licences.id = licenceId
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
  seller, 
  licenceId,
  costInEuro,
  euroPrice,
  purchasingPrice,
  expenses,
  totalEurosAmount,
  totalCost
) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
`);

export const updateCar = db.prepare(`UPDATE cars 
  SET updated_at = CURRENT_TIMESTAMP,
   soldPrice = COALESCE(?, soldPrice)
   WHERE id = ?
`);

export const deleteCarById = db.prepare(`DELETE FROM cars WHERE id = ?`);

export const deleteAllCars = db.prepare(`DELETE FROM cars`);

// onInserCarTrigger
db.prepare(
  `CREATE TRIGGER IF NOT EXISTS set_expirationDate
    AFTER INSERT ON cars
    FOR EACH ROW
      BEGIN
        UPDATE licences
        SET carId = NEW.id
        WHERE licences.id = NEW.licenceId ;
      END;`
).run();
