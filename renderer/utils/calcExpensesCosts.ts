import { Values } from "components/CarForm/types";

const calcExpensesCosts = (expenses: Values["expenses"]) => {
  let expensesEURCost = 0;
  let expensesDAcost = 0;

  // Calculate totalDA and EUR costs of expenses
  expenses.forEach((expense) => {
    expensesEURCost += Number(expense.euroCost);
    expensesDAcost += Number(expense.totalCost);
  });

  return [expensesDAcost, expensesEURCost];
};

export default calcExpensesCosts;
