import { Client, Transaction } from "interfaces";

export interface GetAllClientsResponse {
  results: number;
  records_in_page: number;
  clients: Client[];
}

export interface GetClientLastTransactionResponse {
  client: Client;
  last_transaction: Transaction;
}

interface ClientWithTransactionsTotals extends Client {
  total_sortante_eur: number;
  total_entrante_eur: number;
  total_sortante_dzd: number;
  total_entrante_dzd: number;
}
export interface GetClientTransactionResponse {
  client: ClientWithTransactionsTotals;
  results: number;
  transactions: Transaction[];
}
