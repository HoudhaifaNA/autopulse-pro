import { checkNumber } from "../utils/sqlValidations";

export const createCategoriesTableStatment = `
  CREATE TABLE IF NOT EXISTS categories(
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE COLLATE NOCASE,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;

export const createCarsTableStatment = `
  CREATE TABLE IF NOT EXISTS cars(
    id INTEGER NOT NULL PRIMARY KEY,
    purchased_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    name TEXT AS (brand || ' ' || model) STORED,
    serial_number TEXT NOT NULL,
    registration_number TEXT NOT NULL,
    second_registration_number TEXT '',
    keys INTEGER NOT NULL DEFAULT 1,
    mileage INTEGER NOT NULL DEFAULT 0,
    color TEXT NOT NULL,
    production_year TEXT NOT NULL,
    features TEXT,
    seller_id INTEGER NOT NULL,
    owner_id INTEGER,
    owner_name TEXT,
    licence_price INTEGER,
    purchase_price_eur INTEGER ${checkNumber("purchase_price_eur")},
    eur_exchange_rate INTEGER ${checkNumber("eur_exchange_rate")},
    purchase_price_dzd INTEGER NOT NULL ${checkNumber("purchase_price_dzd")},
    is_exchange INTEGER DEFAULT 0,
    exchange_types TEXT,
    expenses TEXT,
    expense_cost INTEGER ${checkNumber("expense_cost")},
    euro_cost INTEGER  ${checkNumber("euro_cost")},
    total_cost INTEGER AS (purchase_price_dzd + licence_price + expense_cost) STORED,
    buyer_id INTEGER,
    sold_at TEXT,
    given_keys INTEGER,
    papers_type TEXT,
    has_procuration INTEGER,
    has_gray_card INTEGER,
    procuration_received INTEGER,
    gray_card_received INTEGER,
    selling_details TEXT,
    sold_price INTEGER,
    profit INTEGER AS (CASE WHEN buyer_id IS NOT NULL THEN sold_price - total_cost ELSE NULL END) STORED,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (type)
       REFERENCES categories (name)
        ON UPDATE CASCADE
        ON DELETE NO ACTION,
      FOREIGN KEY (seller_id)
       REFERENCES clients (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
      FOREIGN KEY (buyer_id)
       REFERENCES clients (id)
        ON UPDATE NO ACTION
        ON DELETE CASCADE
      FOREIGN KEY (owner_id)
       REFERENCES licences (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
    )
  `;

export const createClientsTableStatment = `
  CREATE TABLE IF NOT EXISTS clients(
    id INTEGER NOT NULL PRIMARY KEY,
    full_name TEXT NOT NULL UNIQUE COLLATE NOCASE,
    phone TEXT COLLATE NOCASE,
    email TEXT COLLATE NOCASE,
    address TEXT,
    eur_balance NUMERIC NOT NULL DEFAULT 0 ${checkNumber("eur_balance")},
    dzd_balance NUMERIC NOT NULL DEFAULT 0 ${checkNumber("dzd_balance")},
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `;
export const createExpensesTableStatment = `
  CREATE TABLE IF NOT EXISTS expenses(
    id INTEGER NOT NULL PRIMARY KEY,
    expense_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    raison TEXT NOT NULL,
    cost INTEGER NOT NULL ${checkNumber("cost")},
    note TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;

export const createLicencesTableStatment = `
    CREATE TABLE IF NOT EXISTS licences(
    id INTEGER NOT NULL PRIMARY KEY,
    purchased_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    seller_id INTEGER NOT NULL,
    moudjahid TEXT NOT NULL,
    wilaya TEXT,
    serial_number INTEGER,
    price INTEGER DEFAULT 0,
    attachments TEXT,
    car_id INTEGER,
    is_reserved INTEGER DEFAULT 0,
    issue_date TEXT NOT NULL,
    expiration_date TEXT AS (DATETIME(issue_date, '+5 years')) STORED,
    note TEXT, 
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id)
     	REFERENCES clients (id)
       ON UPDATE NO ACTION
       ON DELETE CASCADE
    FOREIGN KEY (car_id)
     	REFERENCES cars (id)
       ON UPDATE NO ACTION
       ON DELETE SET NULL
    )`;

export const createPapersTableStatment = `
  CREATE TABLE IF NOT EXISTS papers(
  id INTEGER PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('dossier', 'cart grise')),
  given_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  purchased_at TEXT,
  seller_id INTEGER NOT NULL,
  car_id INTEGER NOT NULL UNIQUE,
  owner TEXT,
  note TEXT,
  price INTEGER DEFAULT 0 ${checkNumber("price")},
  recipient TEXT,
  received_at TEXT,
  has_received INTEGER AS (CASE WHEN received_at IS NOT NULL THEN 1 ELSE 0 END) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id)
   REFERENCES clients (id)
     ON UPDATE NO ACTION
     ON DELETE CASCADE
  FOREIGN KEY (car_id)
   REFERENCES cars (id)
     ON UPDATE NO ACTION
     ON DELETE CASCADE
  )`;

export const createProcurationsTableStatment = `
  CREATE TABLE IF NOT EXISTS procurations(
  id INTEGER PRIMARY KEY,
  purchased_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  car_id INTEGER NOT NULL UNIQUE,
  seller_id INTEGER NOT NULL,
  procurator TEXT NOT NULL,
  notary TEXT,
  price INTEGER DEFAULT 0 ${checkNumber("price")},
  is_expense INTEGER DEFAULT 0,
  deal_id INTEGER,
  recipient TEXT,
  note TEXT,
  issue_date TEXT NOT NULL,
  expiration_date TEXT AS (DATETIME(issue_date, '+3 years')) STORED,
  received_at TEXT,
  has_received INTEGER AS (CASE WHEN received_at IS NOT NULL THEN 1 ELSE 0 END) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (car_id)
   REFERENCES cars (id)
     ON UPDATE NO ACTION
     ON DELETE CASCADE
  FOREIGN KEY (seller_id)
    REFERENCES clients (id)
     ON UPDATE NO ACTION
     ON DELETE CASCADE
  FOREIGN KEY (deal_id)
    REFERENCES expenses (id)
     ON UPDATE NO ACTION
     ON DELETE CASCADE
  )`;

export const createTransactionsTable = `
  CREATE TABLE IF NOT EXISTS transactions(
    id INTEGER NOT NULL PRIMARY KEY,
    client_id INTEGER NOT NULL,
    transaction_date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type TEXT NOT NULL CHECK (type IN ('car', 'licence', 'procuration', 'paper', 'Fiat')),
    product_id INTEGER,
    info1 TEXT NOT NULL,
    info2 TEXT NOT NULL,
    info3 TEXT,
    info4 TEXT,
    direction TEXT NOT NULL CHECK (direction IN ('sortante', 'entrante')),
    currency TEXT NOT NULL CHECK (currency IN ('DZD', 'EUR')),
    amount INTEGER NOT NULL ${checkNumber("amount")},
    recipient TEXT,
    note TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (product_id, type, direction),
    FOREIGN KEY (client_id)
     REFERENCES clients (id)
     ON UPDATE NO ACTION
     ON DELETE CASCADE
  )`;

export const createUsersTableStatment = `
  CREATE TABLE IF NOT EXISTS users(
  username TEXT NOT NULL PRIMARY KEY COLLATE NOCASE,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`;
