import { Values } from "components/CarForm/types";

const calcExpensesCosts = (expenses: Values["expenses"]) => {
  let expensesEURCost = 0;
  let expensesDZDcost = 0;

  // Calculate total DZD and EUR costs of expenses
  expenses.forEach((expense) => {
    expensesEURCost += expense.euroCost;
    expensesDZDcost += expense.totalCost;
  });

  return [expensesDZDcost, expensesEURCost];
};

export default calcExpensesCosts;
