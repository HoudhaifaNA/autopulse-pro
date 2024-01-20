import dateToString from "utils/dateToString";
import { DeliverPaperInitalValues } from "./types";

const now = dateToString(new Date());

export const INITIAL_VALUES: DeliverPaperInitalValues = {
  received_at: now,
  recipient: "",
  note: "",
};
