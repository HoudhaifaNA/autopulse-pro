import dateToString from "utils/dateToString";
import { ProcurationInitalValues } from "./types";
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

export const INITIAL_VALUES: ProcurationInitalValues = {
  purchased_at: now,
  type_ui: "Transaction",
  type: "transaction",
  licence_id: 0,
  moudjahid: "",
  notary: "",
  price: 0,
  issue_date: now,
  received_at: null,
};
