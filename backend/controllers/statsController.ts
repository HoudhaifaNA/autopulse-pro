import db from "../database";
import * as S from "../statments/statStatments";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";

import tryCatch from "../utils/tryCatch";
import { TExchangeTypes } from "../../interfaces";

interface ITotalCount {
  total_count: number;
}

interface LostProfit {
  cars_count: number;
  lost_profit: number;
  exchange_types: string;
}

const TABLES = ["clients", "cars", "licences", "expenses", "procurations", "papers", "transactions"];

const selectCarsPrices = (column: string, filterQueries: string[]) => {
  if (column === "sold_price" || column === "profit") {
    filterQueries.push(`cars.buyer_id IS NOT NULL`);
  }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  let priceQuery = ``;

  if (column === "profit") {
    priceQuery = S.selectCarsProfitQuery.replaceAll("--FILTER", filterClause);
  } else {
    priceQuery = S.selectCarsPricesQuery.replaceAll("--PRICE", column).replaceAll("--FILTER", filterClause);
  }

  const selectCarsStatsQuery = `
  ${priceQuery}
  GROUP BY types.type;
  `;

  return db.prepare(selectCarsStatsQuery).all();
};

export const getCarsStock = tryCatch((req, res) => {
  const { type, orderBy = "name" } = req.query;

  const rangeFilters = ["purchased_at", "sold_at"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query);

  if (type) {
    const typeFilter = `cars.type = '${type}'`;
    filterQueries.push(typeFilter);
  }

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";
  const orderByQuery = formatSortingQuery(orderBy);

  const selectCarsStockByNameQuery = `
    SELECT name,
    ${S.calculateCarsStockQuery}
    ${filterClause}
    GROUP BY LOWER(TRIM(name))
    ${orderByQuery}
  `;

  const selectCarsStockTotalQuery = `
    SELECT
    ${S.calculateCarsStockQuery}
    ${filterClause}
    ${orderByQuery}
  `;

  const carsStockByName = db.prepare(selectCarsStockByNameQuery).all();
  const totalCarsStock = db.prepare(selectCarsStockTotalQuery).get();

  return res.status(200).json({
    status: "success",
    result: carsStockByName.length,
    total: totalCarsStock,
    car_stock: carsStockByName,
  });
});

export const getDocumentsCount = tryCatch((req, res) => {
  const { date_range } = req.query;

  let totalCounts = {};

  TABLES.forEach((table) => {
    let rangeFilters = ["purchased_at"];

    if (table === "transactions") {
      rangeFilters = ["transaction_date"];
    } else if (table === "expenses") {
      rangeFilters = ["expense_date"];
    } else if (table === "clients") {
      rangeFilters = [];
    }

    const tableRangeQuery = {
      [rangeFilters[0]]: date_range,
    };

    const filterQueries = generateRangeFilters(rangeFilters, tableRangeQuery);

    const filters = filterQueries.join(" AND ");
    const filterClause = filters ? `WHERE ${filters}` : "";

    const calculateCountsQuery = `
    ${S.calculateCountsQuery}
    ${filterClause}
    `;

    const { total_count } = db.prepare(calculateCountsQuery.replace("--TABLE", table)).get() as ITotalCount;
    totalCounts = { ...totalCounts, [table]: total_count };
  });

  return res.status(200).json({
    status: "success",
    ...totalCounts,
  });
});

export const getClientsBalanaceStats = tryCatch((_req, res) => {
  const dzdBalanceStatus = db.prepare(S.selectBalanceStats.replaceAll("--BALANCE", "dzd_balance")).all();
  const eurBalanceStatus = db.prepare(S.selectBalanceStats.replaceAll("--BALANCE", "eur_balance")).all();

  return res.status(200).json({
    status: "success",
    dzd_balance_status: dzdBalanceStatus,
    eur_balance_status: eurBalanceStatus,
  });
});

export const getCarsStats = tryCatch((req, res) => {
  const rangeFilters = ["purchased_at", "sold_at"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query);

  let lostProfitAddOnFilters: string = "";
  filterQueries.forEach((filter) => (lostProfitAddOnFilters += ` AND ${filter}`));

  const selectLostProfitQuery = `
  ${S.selectLostLocaleProfitQuery}
  ${lostProfitAddOnFilters}
  GROUP BY exchange_types
  `;

  const lostProfitCategories = db.prepare(selectLostProfitQuery).all() as LostProfit[];

  const totalLostProfit = {
    locale: 0,
    europe: 0,
    dubai: 0,
  };

  lostProfitCategories.forEach((category) => {
    const exchangeTypes: [TExchangeTypes] = JSON.parse(category.exchange_types);
    let percentage = 1 / exchangeTypes.length;

    exchangeTypes.forEach((type) => {
      totalLostProfit[type] += category.lost_profit * percentage;
    });
  });

  const totalPurchasePriceEUR = selectCarsPrices("purchase_price_eur", filterQueries);
  const totalPurchasePriceDZD = selectCarsPrices("purchase_price_dzd", filterQueries);
  const totalExpenseCost = selectCarsPrices("expense_cost", filterQueries);
  const totalSoldPrice = selectCarsPrices("sold_price", filterQueries);
  const totalProfit = selectCarsPrices("profit", filterQueries);

  return res.status(200).json({
    status: "success",
    total_purchase_price_eur: totalPurchasePriceEUR,
    total_purchase_price_dzd: totalPurchasePriceDZD,
    total_expense_cost: totalExpenseCost,
    total_sold_price: totalSoldPrice,
    total_profit: totalProfit,
    total_lost_profit: totalLostProfit,
  });
});

export const getLicencesStats = tryCatch((req, res) => {
  const rangeFilters = ["purchased_at", "issue_date"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query);

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";

  const selectLicencesTotalCost = `
  ${S.selectLicencesTotalCost}
  ${filterClause}
  `;

  const licencesTotalCost = db.prepare(selectLicencesTotalCost).get();

  return res.status(200).json({
    status: "success",
    licences_total_cost: licencesTotalCost,
  });
});

export const getTransactionsStats = tryCatch((req, res) => {
  const rangeFilters = ["transaction_date"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query);

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";

  const selectTransctionsAmountByType = `
  ${S.selectTransactionsAmount}
  ${filterClause}
  GROUP BY type
  `;

  const transactionsAmount = db.prepare(selectTransctionsAmountByType).all();

  return res.status(200).json({
    status: "success",
    transactions_total_amount: transactionsAmount,
  });
});
export const getExpensesStats = tryCatch((req, res) => {
  const rangeFilters = ["expense_date"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query);

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";

  const selectExpensesTotalCost = `
  ${S.selectExpensesTotalCost}
  ${filterClause}
  `;

  const expensesTotalCost = db.prepare(selectExpensesTotalCost).get();

  return res.status(200).json({
    status: "success",
    expenses_total_cost: expensesTotalCost,
  });
});

export const getProcurationsStats = tryCatch((req, res) => {
  const rangeFilters = ["purchased_at", "issue_date", "received_at"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query);

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";

  const selectProcurationsTotalCost = `
  ${S.selectProcurationsTotalCost}
  ${filterClause}
  `;

  const procurationsTotalCost = db.prepare(selectProcurationsTotalCost).get();

  return res.status(200).json({
    status: "success",
    procurations_total_cost: procurationsTotalCost,
  });
});

export const getPapersStats = tryCatch((req, res) => {
  const rangeFilters = ["purchased_at", "issue_date", "received_at"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query);

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";

  const selectPapersTotalCost = `
  ${S.selectPapersTotalCost}
  ${filterClause}
  `;

  const papersTotalCost = db.prepare(selectPapersTotalCost).get();

  return res.status(200).json({
    status: "success",
    papers_total_cost: papersTotalCost,
  });
});
