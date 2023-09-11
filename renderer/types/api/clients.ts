import { Client, Transaction } from "interfaces";

export interface GetAllClientsResponse {
  results: number;
  records_in_page: number;
  clients: Client[];
}

export interface GetClientTransactionResponse {
  client: Client;
  transactions: Transaction[];
}
