interface Client {
  id: number;
  name: string;
}
export interface TransactionValues {
  date: Date;
  client: Client;
  method: string;
  amount: number;
  direction: "sortante" | "entrante";
}
export interface EuroTransferValues {
  date: Date;
  client: Client;
  method: string;
  amount: number;
  euroPrice: number;
  total: number;
  direction: "sortante" | "entrante";
}
