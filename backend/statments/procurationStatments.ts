import db from "../database";

const IS_VALID_PRICE = (field) => {
  return `
    CHECK (${field} >= 0)
    CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;
};

// db.prepare("DROP TABLE procurations").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS procurations(
      id INTEGER PRIMARY KEY,
      sellerId INTEGER NOT NULL,
      licenceId INTEGER NOT NULL,
      carId INTEGER NOT NULL,
      ownerId INTEGER NOT NULL, 
      price INTEGER DEFAULT 0 ${IS_VALID_PRICE("price")},
      type TEXT NOT NULL CHECK (type IN ('transaction', 'expense')),
      issued_date TEXT NOT NULL,
      received_date TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(carId),
      FOREIGN KEY (sellerId)
       REFERENCES clients (id)
         ON UPDATE NO ACTION
         ON DELETE CASCADE
      FOREIGN KEY (ownerId)
       REFERENCES clients (id)
         ON UPDATE NO ACTION
         ON DELETE CASCADE
      FOREIGN KEY (carId)
       REFERENCES cars (id)
         ON UPDATE NO ACTION
         ON DELETE CASCADE
  )`
).run();

const HAS_RECEIVED = `
   CASE
    WHEN procurations.received_date IS NOT NULL THEN 'true'
    ELSE 'false'
    END AS hasReceived`;

const IS_EXPIRATED = `
    CASE
    WHEN datetime('now') > DATE(procurations.issued_date, '+3 years') THEN 'true'
    ELSE 'false'
    END AS isExpirated`;

export const PROCURATION_SELECT_STMT = `SELECT procurations.*,
${HAS_RECEIVED},
${IS_EXPIRATED},
licences.moudjahid AS moudjahid,
clients.fullName AS seller,
owners.fullName AS owner,
cars.name AS carName
FROM procurations
INNER JOIN licences ON licences.id = procurations.licenceId
INNER JOIN clients ON clients.id = procurations.sellerId
LEFT JOIN clients AS owners ON owners.id = procurations.ownerId
INNER JOIN cars ON cars.id = procurations.carId`;

export const getProcurations = db.prepare(`${PROCURATION_SELECT_STMT}`);

export const getProcurationById = db.prepare(`${PROCURATION_SELECT_STMT}
WHERE procurations.id = ?
`);

export const createProcuration = db.prepare(`INSERT INTO procurations(
    sellerId,
    licenceId,
    ownerId,
    carId,
    price,
    type,
    issued_date,
    created_at
    ) VALUES(?,?,?,?,?,?,?,?)`);

export const updateProcuration = db.prepare(`UPDATE procurations 
    SET price = COALESCE(?, price),
    created_at = COALESCE(?, created_at),
    issued_date = COALESCE(?, issued_date),
    received_date = COALESCE(?, received_date)
    WHERE id = ? `);

export const deleteProcurationById = `DELETE FROM procurations WHERE id IN `;

export const deleteProcurations = db.prepare(`DELETE FROM procurations`);
