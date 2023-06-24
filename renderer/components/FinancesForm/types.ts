interface Client {
  id: number;
  name: string;
}
export interface TransactionValues {
  date: Date;
  type: string;
  client: Client;
  method: string;
  amount: number | string;
  direction: string;
}
export interface EuroTransferValues {
  date: Date;
  client: Client;
  method: string;
  amount: number | string;
  euroPrice: number | string;
  total: number;
  direction: string;
}
