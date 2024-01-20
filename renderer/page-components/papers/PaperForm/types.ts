import { Paper } from "interfaces";
export interface PaperInitalValues
  extends Pick<
    Paper,
    "type" | "purchased_at" | "given_at" | "car_id" | "car" | "seller_id" | "seller" | "owner" | "price" | "note"
  > {}
