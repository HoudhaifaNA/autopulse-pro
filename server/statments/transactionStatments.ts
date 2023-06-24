import db from "../database";

/**
 * id is for money transfer
 * Product id is for cars or licences
 * INFOs are changable
 * info1 === name of a car or money or EUROs money or licence
 * info2 === color of the car or the method of sent money
 * info3 === registrationNumber of the car or null for money or amount of euros
 * info4 === year of the car or null for money or price of 100 euros
 * total === Price of car or amount of the money in DZD sent or price of licence
 */

// db.prepare("DROP TABLE transactions").run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS transactions(
    id INTEGER NOT NULL PRIMARY KEY,
    productId INTEGER,
    clientId INTEGER NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL,
    info1 TEXT NOT NULL,
    info2 TEXT NOT NULL,
    info3 TEXT,
    info4 TEXT,
    total INTEGER NOT NULL,
    direction TEXT NOT NULL CHECK (direction IN ('sortante', 'entrante', 'virement en euros')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (productId, type, direction),
    FOREIGN KEY (clientId)
     REFERENCES clients (id)
     ON UPDATE NO ACTION
     ON DELETE CASCADE
)`
).run();

const SELECT_STMT = `SELECT transactions.*,
    clients.fullName AS client
    FROM transactions
    INNER JOIN clients ON clients.id = clientId
    `;

export const getTransactions = db.prepare(`${SELECT_STMT} ORDER BY date DESC`);

export const getMoneyTransactions = db.prepare(`
  ${SELECT_STMT}
  WHERE  type = 'DA' OR type = 'euroTransfer'
  ORDER BY date DESC
`);
export const getEUROsTransactions = db.prepare(`
    SELECT transactions.*,
    transactions.info2 AS method,
    CAST(transactions.info3 AS INTEGER) AS eurosAmount,
    CAST(transactions.info4 AS INTEGER) AS euroPrice,
    clients.fullName AS client
    FROM transactions
    INNER JOIN clients ON clients.id = clientId
    WHERE  type = 'euros'
    ORDER BY date DESC
`);

export const getTransactionsByClient = db.prepare(`SELECT * FROM transactions 
    WHERE clientId = ?
    ORDER BY date DESC
`);

export const getTransactionById = db.prepare(
  `${SELECT_STMT} WHERE transactions.id = ?   `
);

export const createTransaction = db.prepare(`INSERT INTO transactions(
    productId,
    clientId,
    date,
    type,
    info1,
    info2,
    info3,
    info4,
    total,
    direction 
) VALUES(?,?,?,?,?,?,?,?,?,?)`);

export const deleteTransactionByProduct = `DELETE FROM transactions WHERE type = ? AND productId IN `;

export const deleteTransactionByType = db.prepare(
  `DELETE FROM transactions WHERE  type = ?`
);

export const deleteTransactionById = `DELETE FROM transactions WHERE id IN `;

export const deleteTransactions = db.prepare(`DELETE FROM transactions`);

// db.prepare("DROP TRIGGER updateBalanceOnInsert").run();
// db.prepare("DROP TRIGGER updateBalanceOnDelete").run();

db.prepare(
  `CREATE TRIGGER IF NOT EXISTS updateBalanceOnInsert
      AFTER INSERT ON transactions
      FOR EACH ROW
        BEGIN
          UPDATE clients
          SET balance = IIF(NEW.direction = 'entrante', clients.balance + NEW.total, clients.balance - NEW.total)
          WHERE clients.id = NEW.clientId ;
        END;`
).run();

db.prepare(
  `CREATE TRIGGER IF NOT EXISTS updateBalanceOnDelete
      AFTER DELETE ON transactions
      FOR EACH ROW
        BEGIN
          UPDATE clients
          SET balance = IIF(OLD.direction = 'entrante', clients.balance - OLD.total, clients.balance + OLD.total)
          WHERE clients.id = OLD.clientId ;
        END;`
).run();
