import { Values } from "components/CarForm/types";

const calcExpensesCosts = (expenses: Values["expenses"]) => {
  let expensesEURCost = 0;
  let expensesDZDcost = 0;

  // Calculate total DZD and EUR costs of expenses
  expenses.forEach((expense) => {
    expensesEURCost += Number(expense.euroCost);
    expensesDZDcost += Number(expense.totalCost);
  });

  return [expensesDZDcost, expensesEURCost];
};

export default calcExpensesCosts;
