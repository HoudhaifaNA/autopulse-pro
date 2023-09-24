import { Car } from "interfaces";

export interface SaleInitialValues
  extends Pick<
    Car,
    | "sold_at"
    | "sold_price"
    | "buyer_id"
    | "buyer"
    | "given_keys"
    | "papers_type"
    | "has_procuration"
    | "has_gray_card"
    | "selling_details"
  > {}
