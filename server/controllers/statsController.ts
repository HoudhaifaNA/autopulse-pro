import db from "../database";
import { getCars } from "../statments/carStatments";
import { getClients } from "../statments/clientStatments";
import { getExpenses } from "../statments/expensesStatments";
import { getLicences } from "../statments/licenceStatments";
import { getTransactions } from "../statments/transactionStatments";

import tryCatch from "../utils/tryCatch";

const getDebtStatus = db.prepare(`
SELECT
  CASE
    WHEN balance > 0 THEN 'lender'
    WHEN balance < 0 THEN 'indebt'
    ELSE 'balanced'
  END AS status,
  COUNT(*) AS count,
  SUM(balance) 'amount'
  FROM clients
  GROUP BY status `);

const getTransactionsType = db.prepare(
  `SELECT type,direction, 
  SUM(total) "amount" 
  FROM transactions 
  GROUP BY type, direction`
);
const getMoneyAmount = db.prepare(
  `SELECT direction, 
  SUM(total) "amount" 
  FROM transactions 
  GROUP BY direction`
);

const getMostOwerPerson = db.prepare(`
    SELECT fullName,
    MAX(balance) 'amount'
    FROM clients
`);
const getMostDebtedPerson = db.prepare(`
    SELECT fullName,
    MIN(balance) 'amount'
    FROM clients
`);

const boughtCars = db.prepare(`SELECT type, 
  COUNT(*) as count, 
  SUM(totalCost) 'total'
  FROM cars
  GROUP BY type
`);
const soldCars = db.prepare(`SELECT type, 
  COUNT(IIF(soldPrice > 0, 1, NULL)) AS count,
  SUM(soldPrice) 'total'
  FROM cars
  GROUP BY type
`);
const carsProfits = db.prepare(`SELECT type, 
  COUNT(IIF(soldPrice > 0, 1, NULL)) AS count,
  SUM(profit) 'profit'
  FROM cars
  GROUP BY type
`);

const totalExpenses = db.prepare(`SELECT 
  COUNT(*) AS count,
  SUM(amount) 'total'
  FROM expenses
`);

const avgPurchasingPrice = db.prepare(`SELECT type,
  AVG(totalCost) 'avgTotal'
  FROM cars
  GROUP BY type
`);
const avgSoldPrice = db.prepare(`SELECT type,
  AVG(soldPrice) 'avgSold'
  FROM cars
  WHERE soldPrice > 0
  GROUP BY type
`);

export const getCounts = tryCatch((req, res) => {
  const clientsCount = getClients.all();
  const carsCount = getCars.all();
  const licencesCount = getLicences.all();
  const expensesCount = getExpenses.all();
  const transactionsCount = getTransactions.all();
  const financeList = getMoneyAmount.all();
  const transactionsType = getTransactionsType.all();
  const debtStatus = getDebtStatus.all();
  const mostOwerPerson = getMostOwerPerson.get();
  const mostDebtedPerson = getMostDebtedPerson.get();
  const boughtCarsList = boughtCars.all();
  const avgCarCost = avgPurchasingPrice.all();
  const avgSold = avgSoldPrice.all();
  const soldCarsList = soldCars.all();
  const totalExpensesList = totalExpenses.all();
  const carsProfitsList = carsProfits.all();

  res.status(200).json({
    status: "success",
    clients: clientsCount.length,
    cars: carsCount.length,
    licences: licencesCount.length,
    transactions: transactionsCount.length,
    expensesCount: expensesCount.length,
    transactionsType,
    debtStatus,
    mostDebtedPerson,
    mostOwerPerson,
    boughtCarsList,
    soldCarsList,
    totalExpensesList,
    avgCarCost,
    avgSold,
    carsProfitsList,
    finance: financeList,
  });
});
