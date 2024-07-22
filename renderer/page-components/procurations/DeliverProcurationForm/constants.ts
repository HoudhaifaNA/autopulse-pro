import dateToString from "utils/dateToString";
import { DeliverProcurationInitalValues } from "./types";

const now = dateToString(new Date());

export const IS_EXPENSE_OPTIONS = [
  { label: "Non", value: 0 },
  { label: "Oui", value: 1 },
];

export const INITIAL_VALUES: DeliverProcurationInitalValues = {
  received_at: now,
  recipient: "",
  is_expense: 0,
  note: "",
};
