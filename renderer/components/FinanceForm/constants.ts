import { Values } from "components/FinanceForm/types";

export const INITIAL_VALUES: Values = {
  date: new Date(),
  client: "",
  method: "",
  amount: 0,
  type: "entrante",
};

export const METHOD_ITEMS = [
  { mainText: "Espèces" },
  { mainText: "Chèque" },
  { mainText: "Virement bancaire" },
  { mainText: "Carte de débit" },
];
