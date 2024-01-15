import dateToString from "utils/dateToString";
import { LicenceInitalValues } from "./types";
import wilayas from "data/wilayas.json";

const now = dateToString(new Date());

export const INITIAL_VALUES: LicenceInitalValues = {
  purchased_at: now,
  moudjahid: "",
  seller: "",
  seller_id: 0,
  wilaya: "",
  serial_number: "",
  price: 0,
  issue_date: now,
  note: "",
  attachments: [],
};

export const WILAYAS_ITEMS = wilayas.map((wilaya) => {
  return { mainText: wilaya.name, secondText: wilaya.id };
});
