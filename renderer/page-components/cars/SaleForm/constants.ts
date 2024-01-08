import dateToString from "utils/dateToString";
import { SaleInitialValues } from "./types";

export const INITIAL_VALUES: SaleInitialValues = {
  sold_at: dateToString(new Date()),
  buyer_id: 0,
  buyer: "",
  sold_price: 0,
  given_keys: 1,
  papers_type: "Dossier",
  has_procuration: 1,
  has_gray_card: 1,
  selling_details: "",
};

export const PROCURATION_OPTIONS = [
  { label: "Non", value: 0 },
  { label: "Oui", value: 1 },
];
export const GRAY_CARD_OPTIONS = [
  { label: "Non", value: 0 },
  { label: "Oui", value: 1 },
];
export const PAPERS_OPTIONS = [
  { label: "Dossier", value: "Dossier" },
  { label: "Double dossier", value: "Double Dossier" },
];
