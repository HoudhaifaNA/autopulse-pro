import { Expense } from "./types";

export const calculateTotalExpenseCost = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.cost_in_dzd, 0);
};

export const calculateTotalEURCost = (ppEUR: number, expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.cost_in_eur, ppEUR);
};

export const calculateTotalCost = (ppDZD: number, licencePrice: number, expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.cost_in_dzd, ppDZD) + licencePrice;
};
