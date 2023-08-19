import db from "../database";

import * as S from "../statments/statStatments";

import tryCatch from "../utils/tryCatch";

export const getCounts = tryCatch((req, res) => {
  const { year } = req.query;
  let STMT = "";
  if (year) STMT = ` WHERE year_date = '${year}'`;

  const { clients_number }: any = db
    .prepare(`${S.GET_CLIENTS_COUNTS} ${STMT}`)
    .get();
  const { cars_number }: any = db.prepare(`${S.GET_CARS_COUNTS} ${STMT}`).get();
  const { licences_number }: any = db
    .prepare(`${S.GET_LICENCES_COUNTS} ${STMT}`)
    .get();
  const { expenses_number }: any = db
    .prepare(`${S.GET_EXPENSES_COUNTS} ${STMT}`)
    .get();
  const { procurations_number }: any = db
    .prepare(`${S.GET_PROCURATIONS_COUNTS} ${STMT}`)
    .get();
  const { papers_number }: any = db
    .prepare(`${S.GET_PAPERS_COUNTS} ${STMT}`)
    .get();
  const { transactions_number }: any = db
    .prepare(`${S.GET_TRANSACTIONS_COUNTS} ${STMT}`)
    .get();

  res.status(200).json({
    status: "success",
    clients: clients_number,
    cars: cars_number,
    licences: licences_number,
    expenses: expenses_number,
    procurations: procurations_number,
    papers: papers_number,
    transactions: transactions_number,
  });
});

export const getClientsStats = tryCatch((req, res) => {
  const clients_types: any = S.GET_CLIENTS_TYPES.all();
  const clients_balance: any = S.GET_CLIENTS_BALANCE.all();

  res.status(200).json({
    status: "success",
    clients_types,
    clients_balance,
  });
});
export const getCarsStats = tryCatch((req, res) => {
  const { year } = req.query;
  let STMT1 = S.GET_CARS_TYPES;
  let STMT2 = S.GET_CARS_COST;
  let STMT3 = S.GET_SOLD_CARS_STATS;
  let STMT4 = S.GET_CARS_LOST_PROFIT;
  let queryByYear = ` WHERE year_date = '${year}'`;
  if (year) {
    STMT1 = STMT1.replace("-- PLACEHOLDER", queryByYear);
    STMT2 = STMT2.replace("-- PLACEHOLDER", queryByYear);
    STMT3 = STMT3.replace("-- PLACEHOLDER", ` AND year_date = '${year}'`);
    STMT4 = STMT4.replace("-- PLACEHOLDER", ` AND year_date = '${year}'`);
  }

  const cars_types = db.prepare(STMT1).all();
  const cars_cost = db.prepare(STMT2).all();
  const sold_cars_stats = db.prepare(STMT3).all();
  const lost_profits = db.prepare(STMT4).all();
  let profitsByType = lost_profits.map((pr: any) => {
    let types = JSON.parse(pr.exchangeTypes);
    let amount = pr.lost_profit / types.length;

    return { amount, types };
  });

  sold_cars_stats.forEach((st: any) => {
    profitsByType.forEach((pr) => {
      if (pr.types.includes(st.type)) st.profit = st.profit + pr.amount;
    });
  });

  // console.log(profitsByType);

  res.status(200).json({
    status: "success",
    cars_types,
    cars_cost,
    sold_cars_stats,
    lost_profits,
  });
});

export const getLicencesStats = tryCatch((req, res) => {
  const { year } = req.query;
  let STMT1 = S.GET_LICENCES_COST;
  let STMT2 = S.GET_LICENCES_WILAYAS;
  let queryByYear = ` WHERE year_date = '${year}'`;
  if (year) {
    STMT1 = STMT1.replace("-- PLACEHOLDER", queryByYear);
    STMT2 = STMT2.replace("-- PLACEHOLDER", ` AND year_date = '${year}'`);
  }
  const licences_cost: any = db.prepare(STMT1).all();
  const licences_wilayas: any = db.prepare(STMT2).all();

  res.status(200).json({
    status: "success",
    licences_cost,
    licences_wilayas,
  });
});

export const getTransactionsStats = tryCatch((req, res) => {
  const { year } = req.query;
  let TOP_FIVE_EURO_STMT = S.TOP_FIVE_EURO_CLIENTS;
  let TOP_FIVE_DA_STMT = S.TOP_FIVE_DA_CLIENTS;
  if (year) {
    TOP_FIVE_EURO_STMT = TOP_FIVE_EURO_STMT.replace(
      "-- PLACEHOLDER",
      ` AND year_date = '${year}'`
    );
    TOP_FIVE_DA_STMT = TOP_FIVE_DA_STMT.replace(
      "-- PLACEHOLDER",
      ` AND year_date = '${year}'`
    );
  }

  const top_five_euro_clients: any = db.prepare(TOP_FIVE_EURO_STMT).all();
  const top_five_DA_clients: any = db.prepare(TOP_FIVE_DA_STMT).all();

  res.status(200).json({
    status: "success",
    top_five_euro_clients,
    top_five_DA_clients,
  });
});
export const getExpensesStats = tryCatch((req, res) => {
  const { year } = req.query;
  let STMT1 = S.TOP_FIVE_MONTHS_EXPENSES;
  let queryByYear = ` WHERE year_date = '${year}'`;
  if (year) {
    STMT1 = STMT1.replace("-- PLACEHOLDER", queryByYear);
  }
  const top_five_months_expenses: any = db.prepare(STMT1).all();

  res.status(200).json({
    status: "success",
    top_five_months_expenses,
  });
});
