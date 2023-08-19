import db from "../database";

const IS_VALID_PRICE = (field) => {
  return `
    CHECK (${field} >= 0)
    CHECK (typeof(${field}) = 'integer' OR typeof(${field}) = 'real')`;
};

// db.prepare("DROP TABLE papers").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS papers(
      id INTEGER PRIMARY KEY,
      sellerId INTEGER NOT NULL,
      carId INTEGER NOT NULL,
      owner TEXT NOT NULL, 
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
      FOREIGN KEY (carId)
       REFERENCES cars (id)
         ON UPDATE NO ACTION
         ON DELETE CASCADE
  )`
).run();

const HAS_RECEIVED = `
   CASE
    WHEN papers.received_date IS NOT NULL THEN 'true'
    ELSE 'false'
    END AS hasReceived`;

export const PAPERS_SELECT_STMT = `SELECT papers.*,
${HAS_RECEIVED},
clients.fullName AS seller,
cars.name AS carName
FROM papers
INNER JOIN clients ON clients.id = papers.sellerId
INNER JOIN cars ON cars.id = papers.carId`;

export const getPapers = db.prepare(`${PAPERS_SELECT_STMT}`);

export const getPaperById = db.prepare(`${PAPERS_SELECT_STMT}
WHERE papers.id = ?
`);

export const createPaper = db.prepare(`INSERT INTO papers(
    sellerId,
    owner,
    carId,
    price,
    type,
    issued_date,
    created_at
    ) VALUES(?,?,?,?,?,?,?)`);

export const updatePaper = db.prepare(`UPDATE papers 
    SET price = COALESCE(?, price),
    created_at = COALESCE(?, created_at),
    issued_date = COALESCE(?, issued_date),
    received_date = COALESCE(?, received_date)
    WHERE id = ? `);

export const deletePaperById = `DELETE FROM papers WHERE id IN `;

export const deletePapers = db.prepare(`DELETE FROM papers`);
