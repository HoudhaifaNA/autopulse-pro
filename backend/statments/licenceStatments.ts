import db from "../database";

// db.prepare("DROP TABLE licences").run();

const IS_VALID = `
   CASE
    WHEN datetime('now') < validUntil AND carId IS NULL THEN 'true'
    ELSE 'false'
    END AS isValid`;

const IS_EXPIRATED = `
    CASE
    WHEN datetime('now') > validUntil THEN 'true'
    ELSE 'false'
    END AS isExpirated`;

export const SELECT_BASE_QUERY = `SELECT licences.*,
  ${IS_VALID}, 
  ${IS_EXPIRATED},
  clients.fullName AS seller
  FROM licences
  INNER JOIN clients ON clients.id = sellerId
  `;

db.prepare(
  `CREATE TABLE IF NOT EXISTS licences(
    id INTEGER PRIMARY KEY,
    sellerId TEXT NOT NULL,
    moudjahid TEXT NOT NULL,
    wilaya TEXT,
    serialNumber TEXT ,
    price INTEGER DEFAULT 0,
    attachments TEXT,
    carId TEXT,
    validUntil TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sellerId)
     REFERENCES clients (id)
       ON UPDATE NO ACTION
       ON DELETE CASCADE
    FOREIGN KEY (carId)
     REFERENCES cars (id)
       ON UPDATE NO ACTION
       ON DELETE SET NULL
)`
).run();

export const getLicencesCount = db.prepare(
  `SELECT COUNT(*) as total_rows FROM licences`
);
export const getLicences = `${SELECT_BASE_QUERY}  ORDER BY seller
  `;

export const getLicenceById = db.prepare(
  `SELECT licences.*, 
  ${IS_VALID}, 
  ${IS_EXPIRATED},
  clients.fullName AS seller,
  cars.name AS carName
  FROM licences
  INNER JOIN clients ON clients.id = licences.sellerId
  LEFT JOIN cars ON licences.carId IS NOT NULL AND licences.carId = cars.id
  WHERE licences.id = ?`
);

export const getLicenceByMoudjahid = db.prepare(
  `${SELECT_BASE_QUERY} WHERE licences.moudjahid = ?`
);

export const createLicence = db.prepare(`INSERT INTO licences(
    sellerId,
    moudjahid,
    serialNumber,
    wilaya,
    price,
    attachments,
    validUntil,
    created_at
) VALUES(?,?,?,?,?,?, DATE(?, '+5 years'), ?)`);

export const updateLicence = db.prepare(`UPDATE licences
 SET sellerId = COALESCE(?, sellerId),
 moudjahid = COALESCE(?, moudjahid),
 serialNumber = COALESCE(?, serialNumber),
 wilaya = COALESCE(?, wilaya),
 price = COALESCE(?, price),
 validUntil = COALESCE(DATE(?, '+5 years'), validUntil),
 created_at = COALESCE(?, created_at)
 WHERE id = ?
`);

export const deleteLicenceById = `DELETE FROM licences
    WHERE id IN `;

export const deleteLicences = db.prepare(`DELETE FROM licences`);

db.prepare(
  `CREATE TRIGGER IF NOT EXISTS updateCarTotalCost
      AFTER UPDATE ON licences
      FOR EACH ROW
        BEGIN
          UPDATE cars
          SET totalCost = (cars.totalCost - OLD.price ) + NEW.price
          WHERE cars.id = NEW.carId ;
        END;`
).run();
