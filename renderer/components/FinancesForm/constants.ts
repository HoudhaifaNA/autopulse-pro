import * as T from "components/FinancesForm/types";

export const TRANSACTION_VALUES: T.TransactionValues = {
  date: new Date(),
  client: { id: 0, name: "" },
  method: "",
  amount: 0,
  direction: "entrante",
};

export const EURO_TRANSFER_VALUES: T.EuroTransferValues = {
  date: new Date(),
  client: { id: 0, name: "" },
  amount: 0,
  euroPrice: 0,
  total: 0,
  method: "",
  direction: "entrante",
};

export const METHOD_ITEMS = [
  { mainText: "Espèces" },
  { mainText: "Chèque" },
  { mainText: "Virement bancaire" },
  { mainText: "Carte de débit" },
];
