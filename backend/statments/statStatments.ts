export const calculateCarsStockQuery = `
  count(*) AS bought_number,
  SUM(CASE WHEN buyer_id IS NOT NULL THEN 1 ELSE 0 END) AS sold_number,
  COUNT(*) - SUM(CASE WHEN buyer_id IS NOT NULL THEN 1 ELSE 0 END) AS in_stock
  FROM cars
  `;

export const calculateCountsQuery = `
  SELECT
  COUNT(*) AS total_count
  FROM --TABLE
  `;

export const selectBalanceStats = `
  SELECT
    status.balance_status,
    IFNULL(client_count, 0) AS client_count,
    IFNULL(amount, 0) AS amount
  FROM (
    SELECT 'Créditeur' AS balance_status
    UNION ALL
    SELECT 'Débiteur'
    UNION ALL
    SELECT 'Équilibré'
  ) AS status
  LEFT JOIN (
    SELECT
      CASE
        WHEN --BALANCE > 0 THEN 'Créditeur'
        WHEN --BALANCE < 0 THEN 'Débiteur'
        ELSE 'Équilibré'
      END AS balance_status,
      COUNT(*) AS client_count,
      SUM(--BALANCE) AS amount
    FROM clients
    GROUP BY balance_status
  ) AS client_stats ON status.balance_status = client_stats.balance_status;
  `;

export const selectCarsAllPrices = `
  SELECT
    type,
    COUNT(id) AS total_cars_count,
    COALESCE(SUM(total_cost), 0) AS total_purchase,
    COUNT(CASE WHEN buyer_id IS NOT NULL THEN 1 END) AS sold_cars_count,
    COALESCE(SUM(CASE WHEN buyer_id IS NOT NULL THEN total_cost ELSE 0 END), 0) AS sold_total_purchase,
    COALESCE(SUM(CASE WHEN buyer_id IS NOT NULL THEN sold_price ELSE 0 END), 0) AS total_sold,
    COALESCE(SUM(CASE WHEN buyer_id IS NOT NULL THEN profit ELSE 0 END), 0) AS total_profit,
    COUNT(CASE WHEN buyer_id IS NOT NULL AND profit > 0 THEN 1 END) AS total_profited_count,
    COUNT(CASE WHEN buyer_id IS NOT NULL AND profit < 0 THEN 1 END) AS total_lost_count,
    COALESCE(SUM(CASE WHEN buyer_id IS NOT NULL AND profit > 0 THEN profit ELSE 0 END), 0) AS total_positive_profit,
    COALESCE(SUM(CASE WHEN buyer_id IS NOT NULL AND profit < 0 THEN profit ELSE 0 END), 0) AS total_negative_profit
  FROM cars
`;

export const selectCarsByTypePrices = `
  SELECT
    all_types.type,
    COALESCE(COUNT(cars.id), 0) AS total_cars_count,
    COALESCE(SUM(cars.total_cost), 0) AS total_purchase,
    COUNT(CASE WHEN cars.buyer_id IS NOT NULL THEN 1 END) AS sold_cars_count,
    COALESCE(SUM(CASE WHEN cars.buyer_id IS NOT NULL THEN cars.total_cost ELSE 0 END), 0) AS sold_total_purchase,
    COALESCE(SUM(CASE WHEN cars.buyer_id IS NOT NULL THEN cars.sold_price ELSE 0 END), 0) AS total_sold,
    COALESCE(SUM(CASE WHEN cars.buyer_id IS NOT NULL THEN cars.profit ELSE 0 END), 0) AS total_profit,
    COUNT(CASE WHEN cars.buyer_id IS NOT NULL AND cars.profit > 0 THEN 1 END) AS total_profited_count,
    COUNT(CASE WHEN cars.buyer_id IS NOT NULL AND cars.profit < 0 THEN 1 END) AS total_lost_count,
    COALESCE(SUM(CASE WHEN cars.buyer_id IS NOT NULL AND cars.profit > 0 THEN cars.profit ELSE 0 END), 0) AS total_positive_profit,
    COALESCE(SUM(CASE WHEN cars.buyer_id IS NOT NULL AND cars.profit < 0 THEN cars.profit ELSE 0 END), 0) AS total_negative_profit
  FROM (
    SELECT DISTINCT type
    FROM cars
  ) all_types
  LEFT JOIN cars ON all_types.type = cars.type --TYPES 
  GROUP BY all_types.type;
`;

export const selectLicencesTotalCost = `
	SELECT 
	COUNT(*) AS licences_count,
	IFNULL(SUM(price), 0) AS total_cost
	FROM licences
  `;

export const selectTransactionsAmount = `
  SELECT
    currencies.currency AS currency,
    IFNULL(COUNT(transactions.type), 0) AS transactions_count,
    IFNULL(SUM(transactions.amount), 0) AS total_amount
  FROM
    (SELECT 'EUR' AS currency
    UNION SELECT 'DZD'
  ) AS currencies
  LEFT JOIN
    transactions ON currencies.currency = transactions.currency
            AND transactions.type = 'Fiat'
  `;

export const selectExpensesTotalCost = `
	SELECT 
	COUNT(*) AS expenses_count,
	IFNULL(SUM(cost), 0) AS total_cost
	FROM expenses
  `;

export const selectProcurationsTotalCost = `
	SELECT 
	COUNT(*) AS procurations_count,
	IFNULL(SUM(price), 0) AS total_cost
	FROM procurations
  `;

export const selectPapersTotalCost = `
	SELECT 
	COUNT(*) AS papers_count,
	IFNULL(SUM(price), 0) AS total_cost
	FROM papers
  `;
