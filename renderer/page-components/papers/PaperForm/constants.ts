import dateToString from "utils/dateToString";
import { PaperInitalValues } from "./types";
import { SelectOption } from "components/Input/types";

const now = dateToString(new Date());

export const TYPE_ITEMS: SelectOption[] = [
  {
    mainText: "Transaction",
    relatedValues: ["transaction"],
  },
  {
    mainText: "Dépense",
    relatedValues: ["expense"],
  },
];

export const INITIAL_VALUES: PaperInitalValues = {
  purchased_at: now,
  type_ui: "Transaction",
  type: "transaction",
  car_id: 0,
  car: "",
  seller: "",
  seller_id: 0,
  price: 0,
  issue_date: now,
  received_at: null,
};
