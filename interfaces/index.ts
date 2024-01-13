export interface Client {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  eur_balance: number;
  dzd_balance: number;
  created_at: string;
  updated_at: string;
  last_transaction_date?: string;
}

export interface Licence {
  id: number;
  purchased_at: string;
  seller_id: number;
  moudjahid: string;
  wilaya: string;
  serial_number: string;
  price: number;
  attachments: string;
  car_id: number | null;
  issue_date: string;
  expiration_date: string;
  created_at: string;
  updated_at: string;
  is_valid: 0 | 1;
  is_expirated: 0 | 1;
  seller: string;
  car: string | null;
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
  client: string;
  amount: number;
  created_at: string;
  updated_at: string;
}

export type TExchangeTypes = string;

export interface Category {
  id: number;
  name: string;
}
export interface Car {
  id: number;
  purchased_at: string;
  type: TExchangeTypes;
  brand: string;
  model: string;
  name: string;
  serial_number: string;
  registration_number: string;
  second_registration_number: string;
  keys: number;
  mileage: number;
  color: string;
  production_year: string;
  features: string;
  seller_id: number;
  owner_id: number | null;
  owner_name: string;
  licence_price: number;
  purchase_price_eur: number;
  eur_exchange_rate: number;
  purchase_price_dzd: number;
  is_exchange: 0 | 1;
  exchange_types: TExchangeTypes[] | string | null;
  expenses: string;
  expense_cost: number;
  euro_cost: number;
  total_cost: number;
  buyer_id: number | null;
  sold_at: string | null;
  given_keys: number | null;
  papers_type: "Dossier" | "Copier de dossier" | null;
  has_procuration: 0 | 1 | null;
  procuration_received: 0 | 1 | null;
  has_gray_card: 0 | 1 | null;
  gray_card_received: 0 | 1 | null;
  selling_details: string;
  sold_price: number | null;
  profit: number | null;
  created_at: string;
  updated_at: string;
  seller: string;
  buyer: string | null;
  is_licence_incomplete: 0 | 1;
  is_purchase_price_incomplete: 0 | 1;
  is_expense_cost_incomplete: 0 | 1;
  is_sold_price_incomplete: 0 | 1;
}

export interface CarExpense {
  id: string;
  type: "locale" | "à l'étranger";
  raison: string;
  cost_in_eur: number;
  cost_in_dzd: number;
}
export interface Procuration {
  id: number;
  type: "expense" | "transaction";
  purchased_at: string;
  seller_id: number;
  licence_id: number;
  car_id: number;
  owner_id: number;
  notary: string | null;
  price: number;
  deal_id: number | null;
  issue_date: string;
  received_at: string | null;
  expiration_date: string;
  has_received: 0 | 1;
  created_at: string;
  updated_at: string;
  is_expirated: 0 | 1;
  moudjahid: string;
  seller: string;
  owner: string;
  car: string;
}

export interface Paper {
  id: number;
  type: "expense" | "transaction";
  purchased_at: string;
  seller_id: number;
  car_id: number;
  price: number;
  deal_id: number | null;
  issue_date: string;
  received_at: string | null;
  expiration_date: string;
  has_received: 0 | 1;
  created_at: string;
  updated_at: string;
  is_expirated: 0 | 1;
  seller: string;
  car: string;
  owner_id: number;
  owner: string;
}

export interface Expense {
  id: number;
  expense_date: string;
  raison: string;
  cost: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}
