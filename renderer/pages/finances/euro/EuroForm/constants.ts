import { FiatFormInitialValues } from "pages/finances/types";
import dateToString from "utils/dateToString";

export const INITIAL_VALUES: FiatFormInitialValues = {
  client_id: 0,
  client: "",
  transaction_date: dateToString(new Date()),
  type: "Fiat",
  info1: "Argent",
  info2: "Espèces",
  direction: "entrante",
  currency: "EUR",
  amount: 0,
};
