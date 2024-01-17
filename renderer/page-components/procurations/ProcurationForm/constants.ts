import dateToString from "utils/dateToString";
import { ProcurationInitalValues } from "./types";
import { SelectOption } from "components/Input/types";

const now = dateToString(new Date());

export const INITIAL_VALUES: ProcurationInitalValues = {
  purchased_at: now,
  car_id: 0,
  car: "",
  seller_id: 0,
  seller: "",
  procurator: "",
  moudjahid: "",
  notary: "",
  price: 0,
  issue_date: now,
  note: "",
};
