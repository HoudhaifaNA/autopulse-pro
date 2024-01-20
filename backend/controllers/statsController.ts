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
    'total' as name,
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

    if (table === "transactions") filterQueries.push("type = 'Fiat' ");

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

  const filterQueries = generateRangeFilters(rangeFilters, req.query, "cars");

  let filterQuery = "";
  let filterTypes = "";

  if (filterQueries.length > 0) {
    filterQuery = `WHERE ${filterQueries.join(" AND ")}`;
    filterTypes = `AND ${filterQueries.join(" AND ")}`;
  }

  const selectAllCarsStats = `
  ${S.selectCarsAllPrices}
   ${filterQuery}
  `;

  const selectCarsByCategoryStats = S.selectCarsByTypePrices.replace("--TYPES", filterTypes);

  const all_cars = db.prepare(selectAllCarsStats).get();
  const cars_by_category = db.prepare(selectCarsByCategoryStats).all();

  return res.status(200).json({
    status: "success",
    all_cars,
    cars_by_category,
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

  // filterQueries.push(`type = 'Fiat'`);

  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";

  const selectTransctionsAmountByType = `
  ${S.selectTransactionsAmount}
  ${filterClause}
  GROUP BY currencies.currency
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
