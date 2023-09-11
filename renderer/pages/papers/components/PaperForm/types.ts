import { Paper } from "interfaces";

export interface PaperInitalValues
  extends Pick<
    Paper,
    "purchased_at" | "type" | "car_id" | "car" | "seller_id" | "seller" | "price" | "received_at" | "issue_date"
  > {
  type_ui: string;
}
