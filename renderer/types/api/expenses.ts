import { Expense } from "interfaces";

export interface ExpenseGrouped {
  raison: string;
  date_group: string;
  count: number;
  total_cost: number;
}

export interface GetExpensesResponse {
  results: number;
  records_in_page: number;
  expenses: Expense[];
}
export interface GetExpensesDateGroupResponse {
  results: number;
  records_in_page: number;
  expenses: ExpenseGrouped[];
}
