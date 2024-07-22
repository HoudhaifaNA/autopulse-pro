import db from "../database";
import * as S from "../statments/statStatments";
import { selectTransactionsQuery } from "../statments/transactionsStatments";
import { formatSortingQuery, generateRangeFilters } from "../utils/APIFeatures";

import tryCatch from "../utils/tryCatch";

interface ITotalCount {
  total_count: number;
}

interface CarCategoryStats {
  type: string;
  total_cars_count: number;
  total_purchase: number;
  sold_cars_count: number;
  sold_total_purchase: number;
  total_sold: number;
  total_profit: number;
  total_profited_count: number;
  total_lost_count: number;
  total_positive_profit: number;
  total_negative_profit: number;
}
interface LostProfit {
  cars_count: number;
  type: string;
  profit: number;
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

  const selectCarsLostProfit = `
  ${S.selectCarLostProfitQuery}
  `;

  const selectCarsByCategoryStats = S.selectCarsByTypePrices.replace("--TYPES", filterTypes);

  const all_cars = db.prepare(selectAllCarsStats).get();
  const cars_by_category = db.prepare(selectCarsByCategoryStats).all() as CarCategoryStats[];
  const lostProfits = db.prepare(selectCarsLostProfit).all() as LostProfit[];

  const calcCategories: any[] = [];

  cars_by_category.forEach((cat) => {
    let updatedCat: any = cat;

    if (cat.type.includes(" lcl ")) {
      const hasExchangeLostProfit: LostProfit[] = [];
      lostProfits.forEach((c) => {
        if (c.type === cat.type) hasExchangeLostProfit.push(c);
      });
      const totalLostProfit = hasExchangeLostProfit.reduce((a, b) => a + b.profit, 0);
      updatedCat = { ...cat, lost_exchange_profit: totalLostProfit, exchange_lost_count: hasExchangeLostProfit.length };
    }

    if (filterQueries.length === 0 && !cat.type.includes(" lcl ")) {
      const categoryRelatedProfits: LostProfit[] = [];
      lostProfits.forEach((c) => {
        if (JSON.parse(c.exchange_types).includes(cat.type)) categoryRelatedProfits.push(c);
      });

      const lostProfit = categoryRelatedProfits.reduce((a, b) => a + b.profit / JSON.parse(b.exchange_types).length, 0);
      updatedCat = {
        ...updatedCat,
        related_lost_profit: lostProfit,
        total_realted_lost_profit: cat.total_profit + lostProfit,
        related_lost_count: categoryRelatedProfits.length,
      };
    }

    calcCategories.push(updatedCat);
  });

  return res.status(200).json({
    status: "success",
    all_cars,
    cars_by_category: calcCategories,
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
7;

function getPreviousDay(dateRange: string): string {
  const [startDateStr, endDateStr] = dateRange.split("_");

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Subtract one day from each date
  startDate.setDate(startDate.getDate() - 1);
  endDate.setDate(endDate.getDate() - 1);

  // Format the dates back into the desired string format
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return `${formattedStartDate}_${formattedEndDate}`;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}
export const getDailyTransaction = tryCatch((req, res) => {
  const { currency } = req.query;
  const rangeFilters = ["transaction_date"];

  const filterQueries = generateRangeFilters(rangeFilters, req.query);
  const filterListQueries = generateRangeFilters(rangeFilters, req.query, "transactions");

  const prevDayFilters = generateRangeFilters(rangeFilters, {
    transaction_date: getPreviousDay(req.query.transaction_date as any),
  });

  if (currency) {
    filterListQueries.push(`transactions.currency = '${currency}'`);
  }
  const filters = filterQueries.join(" AND ");
  const filterClause = filters ? `WHERE ${filters}` : "";

  const selectDailyTransactionsTotalsQuery = `
  ${S.selectDailyTransactionsTotals}
  ${filterClause}
  GROUP BY currencies.currency
  `;

  const selectDailyTransactionsListQuery = `
  ${selectTransactionsQuery}
  ${filterListQueries.join(" AND ") ? `WHERE ${filterListQueries.join(" AND ")}` : ""}
  `;
  const prevDay = db
    .prepare(
      ` 
  ${S.selectDailyTransactionsTotals}
  ${prevDayFilters.join(" AND ") ? `WHERE ${prevDayFilters.join(" AND ")}` : ""}
  GROUP BY currencies.currency
  `
    )
    .all() as any[];

  const transactionsAmount = db.prepare(selectDailyTransactionsTotalsQuery).all() as any[];
  const transactionsList = db.prepare(selectDailyTransactionsListQuery).all();

  let dailyTransactions = [];
  let prevDayTransactions = [];

  dailyTransactions = [
    {
      currency: "EUR",
      transactions_count: transactionsAmount.find((d) => d.currency === "EUR")?.transactions_count || 0,
      total_amount: transactionsAmount.find((d) => d.currency === "EUR")?.total_amount || 0,
    },
    {
      currency: "DZD",
      transactions_count: transactionsAmount.find((d) => d.currency === "DZD")?.transactions_count || 0,
      total_amount: transactionsAmount.find((d) => d.currency === "DZD")?.total_amount || 0,
    },
  ];
  prevDayTransactions = [
    {
      currency: "EUR",
      transactions_count: prevDay.find((d) => d.currency === "EUR")?.transactions_count || 0,
      total_amount: prevDay.find((d) => d.currency === "EUR")?.total_amount || 0,
    },
    {
      currency: "DZD",
      transactions_count: prevDay.find((d) => d.currency === "DZD")?.transactions_count || 0,
      total_amount: prevDay.find((d) => d.currency === "DZD")?.total_amount || 0,
    },
  ];

  return res.status(200).json({
    status: "success",
    lastDay_transactions: prevDayTransactions,
    daily_transactions: dailyTransactions,
    results: transactionsList.length,
    transactions_list: transactionsList,
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
