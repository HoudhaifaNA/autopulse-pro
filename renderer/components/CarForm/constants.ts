import uid from "utils/uniqid";

import { Values } from "components/CarForm/types";

export const INITIAL_VALUES: Values = {
  step: 1,
  carType: "importé",
  brand: "",
  serie: "",
  model: "",
  serialNumber: "",
  registrationNumber: "",
  color: "",
  year: "",
  seller: "",
  euroCost: 0,
  euroPrice: 0,
  purchasingPrice: 0,
  licence: { name: "", price: 0 },
  expenses: [
    {
      id: uid(),
      type: "à l'étranger",
      raison: "",
      euroCost: 0,
      euroPrice: 0,
      totalCost: 0,
    },
  ],
  euroAmount: 0,
  dzdAmount: 0,
  transactionAgreement: true,
};
