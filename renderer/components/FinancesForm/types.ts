export interface TransactionValues {
  date: Date;
  client: string;
  method: string;
  amount: number;
  type: "sortante" | "entrante";
}
export interface EuroTransferValues {
  date: Date;
  client: string;
  method: string;
  amount: number;
  euroPrice: number;
  total: number;
  type: "acheté" | "vendu";
}
