import { Transaction } from "interfaces";

export interface GetFiatTransactionsResponse {
  results: number;
  records_in_page: number;
  fiat_transactions: Transaction[];
}
