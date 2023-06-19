interface Client {
  id: number;
  name: string;
}
export interface TransactionValues {
  date: Date;
  client: Client;
  method: string;
  amount: number | string;
  direction: "sortante" | "entrante";
}
export interface EuroTransferValues {
  date: Date;
  client: Client;
  method: string;
  amount: number | string;
  euroPrice: number | string;
  total: number;
  direction: "sortante" | "entrante";
}
