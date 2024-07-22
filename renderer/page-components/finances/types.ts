export interface FiatFormInitialValues {
  client_id: number;
  client: string;
  transaction_date: string;
  type: "Fiat";
  info1: "Argent";
  info2: string;
  direction: "sortante" | "entrante";
  currency: "EUR" | "DZD";
  amount: number;
  recipient: string;
  note: string;
}
