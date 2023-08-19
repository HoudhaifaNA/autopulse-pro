import db from "../database";

const getCounts = (table: string, dateQuery: string) => {
  return `SELECT 
            COUNT(id) AS ${table}_number,
            ${dateQuery}
          FROM ${table}
         `;
};

const getDateColumn = (field: string, type: "long" | "short") => {
  if (type === "long")
    return `strftime('%Y', SUBSTR(${field}, 1, 10)) AS year_date`;
  if (type === "short") return `strftime('%Y', ${field}) AS year_date`;
};

export const GET_CLIENTS_COUNTS = getCounts(
  "clients",
  getDateColumn("created_at", "long")
);

export const GET_CARS_COUNTS = getCounts(
  "cars",
  getDateColumn("created_at", "long")
);

export const GET_LICENCES_COUNTS = getCounts(
  "licences",
  getDateColumn("created_at", "long")
);

export const GET_EXPENSES_COUNTS = getCounts(
  "expenses",
  getDateColumn("transferred_at", "short")
);

export const GET_PROCURATIONS_COUNTS = getCounts(
  "procurations",
  getDateColumn("created_at", "long")
);

export const GET_PAPERS_COUNTS = getCounts(
  "papers",
  getDateColumn("created_at", "long")
);

export const GET_TRANSACTIONS_COUNTS = getCounts(
  "transactions",
  getDateColumn("date", "short")
);

export const GET_CLIENTS_TYPES = db.prepare(`
   SELECT clientType,
    COUNT(id) AS clients_number,
    SUM(balance) AS clients_balance
   FROM clients
   GROUP BY clientType
   `);

export const GET_CLIENTS_BALANCE = db.prepare(`
   SELECT
     CASE 
        WHEN balance < 0 THEN 'Negative Balance'
        WHEN balance >= 0 THEN 'Positive Balance'
        END AS balance_status,
        clientType,
        COUNT(*) AS clients_number,
     SUM(balance) AS clients_balance
    FROM clients
    GROUP BY balance_status, clientType;
   `);

export const GET_CARS_TYPES = `
    SELECT type,
    COUNT(id) AS cars_number,
    ${getDateColumn("created_at", "long")}
    FROM cars
    -- PLACEHOLDER
    GROUP BY type
`;

export const GET_CARS_COST = `
    SELECT type,
    COUNT(id) AS cars_number,
    SUM(totalCost) AS total_cost,
    ${getDateColumn("created_at", "long")}
    FROM cars
    -- PLACEHOLDER
    GROUP BY type
`;

export const GET_SOLD_CARS_STATS = `
    SELECT type,
    COUNT(id) AS cars_number,
    SUM(totalCost) AS total_cost,
    CASE 
       WHEN type != 'locale' THEN SUM(totalEurosAmount)
    END AS euro_cost,
    SUM(soldPrice) AS sold_price,
    SUM(CASE WHEN exchangeTypes LIKE '%importé%' AND profit < 0 OR exchangeTypes LIKE '%UAE%' AND profit < 0 THEN 0 ELSE profit END) AS profit,
    ${getDateColumn("created_at", "long")}
    FROM cars
    WHERE buyerId IS NOT NULL -- PLACEHOLDER
    GROUP BY type
`;

/**
 * importe
 *
 */
export const GET_CARS_LOST_PROFIT = `
    SELECT 
    COUNT (*) AS count,
    SUM(profit) AS lost_profit,
    exchangeTypes,
    ${getDateColumn("created_at", "long")}
    FROM cars
    WHERE buyerId IS NOT NULL
          AND type = 'locale'
          AND isExchange = 'true'
          AND exchangeTypes LIKE '%importé%' AND profit < 0 OR exchangeTypes LIKE '%UAE%' AND profit < 0
          -- PLACEHOLDER
    GROUP BY exchangeTypes
`;

export const GET_LICENCES_COST = `
    SELECT
    COUNT(id) AS licences_number,
    SUM(price) AS total_cost,
    ${getDateColumn("created_at", "long")}
    FROM licences
    -- PLACEHOLDER
`;

export const GET_LICENCES_WILAYAS = `
    SELECT
    wilaya,
    COUNT(id) AS licences_number,
    ${getDateColumn("created_at", "long")}
    FROM licences
    WHERE wilaya != '' -- PLACEHOLDER
    GROUP BY wilaya
    ORDER BY licences_number DESC
`;

export const TOP_FIVE_EURO_CLIENTS = `
    SELECT
        COUNT(transactions.id) AS transactions_number,
        clients.fullName AS client,
        clients.clientType AS clientType,
        SUM(transactions.total) AS total,
        ${getDateColumn("transactions.date", "short")}
    FROM transactions
    INNER JOIN clients ON clients.id = clientId
    WHERE clientType = 'euro' -- PLACEHOLDER
    GROUP BY transactions.clientId
    ORDER BY total DESC
    LIMIT 5;
`;
export const TOP_FIVE_DA_CLIENTS = `
    SELECT
        COUNT(transactions.id) AS transactions_number,
        clients.fullName AS client,
        clients.clientType AS clientType,
        SUM(transactions.total) AS total,
        ${getDateColumn("transactions.date", "long")}
    FROM transactions
    INNER JOIN clients ON clients.id = clientId
    WHERE clientType = 'DA' -- PLACEHOLDER
    GROUP BY transactions.clientId
    ORDER BY total DESC
    LIMIT 5;
    `;

export const TOP_FIVE_MONTHS_EXPENSES = `
    SELECT
        strftime('%m', transferred_at) AS month,
        strftime('%Y', transferred_at) AS year,
        SUM(amount) AS total_amount,
        ${getDateColumn("transferred_at", "short")}
    FROM expenses
    -- PLACEHOLDER
    GROUP by month, year
    ORDER BY total_amount DESC
    LIMIT 5;
    
`;

export const CARS_YEARS = db.prepare(`
  SELECT 
  ${getDateColumn("created_at", "long")}
  FROM cars
  GROUP BY year_date
`);

export const LICENCES_YEARS = db.prepare(`
  SELECT 
  ${getDateColumn("created_at", "long")}
  FROM licences
  GROUP BY year_date
`);
export const TRANSACTIONS_YEARS = db.prepare(`
  SELECT 
  ${getDateColumn("date", "short")}
  FROM transactions
  GROUP BY year_date
`);
export const EXPENSES_YEARS = db.prepare(`
  SELECT 
  ${getDateColumn("transferred_at", "short")}
  FROM expenses
  GROUP BY year_date
`);
