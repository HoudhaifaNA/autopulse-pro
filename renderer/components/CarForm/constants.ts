import uid from "utils/uniqid";
import slugify from "utils/slugify";

import cars from "data/cars.json";

import { Values } from "components/CarForm/types";

interface CarModel {
  mainText: string;
}

interface CarsDataType {
  [key: string]: CarModel[];
}

export const INITIAL_VALUES: Values = {
  step: 1,
  created_at: new Date(),
  type: "importé",
  brand: "",
  model: "",
  serialNumber: "",
  registrationNumber: "",
  secondRegistrationNumber: "",
  keys: 1,
  mileage: 0,
  color: "",
  year: "",
  features: "",
  seller: { id: 0, name: "" },
  costInEuros: "",
  euroPrice: 100,
  purchasingPrice: "",
  owner: { id: 0, name: "", price: 0 },
  isExchange: false,
  exchangeTypes: [],
  expenses: [
    {
      id: uid(),
      type: "à l'étranger",
      raison: "Transitaire EURO",
      euroCost: 0,
      totalCost: 0,
    },
    {
      id: uid(),
      type: "locale",
      raison: "Transitaire DA",
      euroCost: 0,
      totalCost: 0,
    },
    {
      id: uid(),
      type: "locale",
      raison: "Dossier",
      euroCost: 0,
      totalCost: 0,
    },
    {
      id: uid(),
      type: "locale",
      raison: "Procuration",
      euroCost: 0,
      totalCost: 0,
    },
  ],
  totalExpensesCost: 0,
  totalEurosAmount: 0,
  totalCost: 0,
};

const CAR_COLORS = ["Noir", "Bleue", "Argent", "Blanche", "Grise"];

export const COLORS_LIST = CAR_COLORS.map((color) => {
  return {
    icon: color.toLowerCase(),
    mainText: color,
  };
});

// Return car brands list in the dropdown form
export const CAR_BRANDS_LIST = cars.map(({ brand }) => {
  return { mainText: brand, icon: slugify(brand) };
});

// Return car brands with their series to be selected dynamically in the dropdown
// ex: {'mercedes': [{mainText: 'C'},{mainText: 'CLA'}]}
export let CAR_MODELS: CarsDataType = {};

cars.forEach(({ brand, models }) => {
  const modelsList = models.map((model) => {
    return { mainText: model };
  });

  CAR_MODELS = { ...CAR_MODELS, [brand.toLowerCase()]: modelsList };
  return CAR_MODELS;
});
