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

export const selectCarsPricesQuery = `
  SELECT
  types.type,
  IFNULL(SUM(cars.--PRICE), 0) AS total,
  IFNULL(cars_count, 0) AS cars_count
  FROM (
  SELECT 'dubai' AS type
  UNION ALL
  SELECT 'europe'
  UNION ALL
  SELECT 'locale'
  ) AS types
  LEFT JOIN (
    SELECT 
    type,
    IFNULL(SUM(--PRICE), 0) AS --PRICE,
    COUNT(*) AS cars_count
    FROM cars
    --FILTER
    GROUP BY type
  ) AS cars ON types.type = cars.type
  `;

export const selectCarsProfitQuery = `
  SELECT
  types.type,
  IFNULL(SUM(
    CASE
      WHEN cars.type = 'locale' AND cars.profit < 0 AND cars.is_exchange = 1 AND (
        cars.exchange_types LIKE '%europe%' 
        OR cars.exchange_types LIKE '%dubai%'
        )
      THEN 0
      ELSE profit
    END
  ), 0) AS total,
  IFNULL(cars_count, 0) AS cars_count
  FROM (
    SELECT 'dubai' AS type
    UNION ALL
    SELECT 'europe'
    UNION ALL
    SELECT 'locale'
  ) AS types
  LEFT JOIN (
    SELECT 
    type,
    is_exchange,
    exchange_types,
    SUM(
      CASE
        WHEN type = 'locale' AND profit < 0 AND is_exchange = 1 AND (
          exchange_types LIKE '%europe%' 
          OR exchange_types LIKE '%dubai%'
          )
        THEN 0
        ELSE profit
      END
    ) AS profit,
    COUNT(*) AS cars_count
    FROM cars
    --FILTER
    GROUP BY type
  ) AS cars ON types.type = cars.type
  `;

export const selectLostLocaleProfitQuery = `
  SELECT 
  SUM(profit) AS lost_profit,
  exchange_types
  FROM cars
  WHERE buyer_id IS NOT NULL
    AND type = 'locale'
    AND profit < 0 
    AND is_exchange = 1
    AND ( exchange_types LIKE '%europe%' OR exchange_types LIKE '%dubai%' )
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
