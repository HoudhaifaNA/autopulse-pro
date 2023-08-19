export interface Client {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  eur_balance: number;
  dzd_balance: number;
  created_at: string;
  updated_at: string;
  last_transaction_date?: string;
  last_transaction?: Transaction;
  transactions?: Transaction[];
}

export interface Licence {
  id: number;
  sellerId: string;
  moudjahid: string;
  wilaya: string;
  serialNumber: string;
  price: number;
  attachments: string;
  carId: string | null;
  validUntil: string;
  created_at: string;
  isValid: "false" | "true";
  isExpirated: "false" | "true";
  seller: string;
  carName: string | null;
}

export interface Transaction {
  id: number;
  client_id: number;
  transaction_date: string;
  type: "car" | "licence" | "procuration" | "paper" | "Fiat";
  product_id: number;
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  direction: "entrante" | "sortante";
  currency: "EUR" | "DZD";
  amount: number;
  created_at: string;
  updated_at: string;
}
