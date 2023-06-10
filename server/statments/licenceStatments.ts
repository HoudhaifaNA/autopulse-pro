import db from "../database";

const IS_NUMBER = (field) =>
  `CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;

// db.prepare("DROP TABLE licences").run();

const IS_VALID = `
   CASE
    WHEN datetime('now') < validUntil AND carId IS NULL THEN 'true'
    ELSE 'false'
    END AS valid`;

const IS_EXPIRATED = `
    CASE
    WHEN datetime('now') > validUntil THEN 'true'
    ELSE 'false'
    END AS isExpirated`;

const SELECT_BASE_QUERY = `SELECT *, ${IS_VALID}, ${IS_EXPIRATED} FROM licences`;

db.prepare(
  `CREATE TABLE IF NOT EXISTS licences(
    id INTEGER PRIMARY KEY,
    seller TEXT NOT NULL,
    moudjahid TEXT NOT NULL,
    wilaya TEXT NOT NULL,
    price INTEGER NOT NULL
      CHECK (price >= 4000) 
      ${IS_NUMBER("price")},
    attachments TEXT,
    carId TEXT,
    validUntil TEXT NOT NULL,
    FOREIGN KEY (seller)
     REFERENCES clients (fullName)
       ON UPDATE NO ACTION
       ON DELETE CASCADE
    FOREIGN KEY (carId)
     REFERENCES cars (id)
       ON UPDATE NO ACTION
       ON DELETE SET NULL
)`
).run();

export const getLicences = db.prepare(SELECT_BASE_QUERY);

export const getLicenceById = db.prepare(`${SELECT_BASE_QUERY} WHERE id = ?`);

export const getLicenceByMoudjahid = db.prepare(
  `${SELECT_BASE_QUERY} WHERE moudjahid = ?`
);

export const createLicence = db.prepare(`INSERT INTO licences(
    seller,
    moudjahid,
    wilaya,
    price,
    attachments,
    validUntil
) VALUES(?,?,?,?,?,DATE(?, '+5 years'))`);

export const updateLicence = db.prepare(`UPDATE licences
 SET moudjahid = COALESCE(?, moudjahid),
 wilaya = COALESCE(?, wilaya),
 price = COALESCE(?, price)
 WHERE id = ?
`);

export const deleteLicenceById = db.prepare(`DELETE FROM licences
    WHERE id = ?`);

export const deleteLicences = db.prepare(`DELETE FROM licences`);