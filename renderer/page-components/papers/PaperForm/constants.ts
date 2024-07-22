import dateToString from "utils/dateToString";
import { PaperInitalValues } from "./types";
import { SelectOption } from "components/Input/types";

const now = dateToString(new Date());

export const TYPE_ITEMS: SelectOption[] = [{ mainText: "dossier" }, { mainText: "cart grise" }];

export const INITIAL_VALUES: PaperInitalValues = {
  given_at: now,
  purchased_at: null,
  type: "dossier",
  car_id: 0,
  car: "",
  seller: "",
  seller_id: 0,
  owner: "",
  price: 0,
  note: "",
};
