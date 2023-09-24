import { Car } from "interfaces";

export interface Expenses {
  id: string;
  type: "locale" | "à l'étranger";
  raison: string;
  cost_in_eur: number;
  cost_in_dzd: number;
}

export interface CarInitialValues
  extends Pick<
    Car,
    | "purchased_at"
    | "type"
    | "brand"
    | "model"
    | "serial_number"
    | "registration_number"
    | "second_registration_number"
    | "keys"
    | "mileage"
    | "color"
    | "production_year"
    | "papers_type"
    | "has_procuration"
    | "has_gray_card"
    | "features"
    | "seller_id"
    | "seller"
    | "owner_id"
    | "owner_name"
    | "licence_price"
    | "purchase_price_eur"
    | "eur_exchange_rate"
    | "purchase_price_dzd"
    | "is_exchange"
    | "exchange_types"
  > {
  expenses: Expenses[];
}
