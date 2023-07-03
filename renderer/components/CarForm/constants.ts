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
  expenses: [
    {
      id: uid(),
      type: "à l'étranger",
      raison: "",
      euroCost: "",
      euroPrice: 100,
      totalCost: "",
    },
  ],
  totalExpensesCost: 0,
  totalEurosAmount: 0,
  totalCost: 0,
};

const CAR_COLORS = [
  "Noir",
  "Bleue",
  "Blanche",
  "Jaune",
  "Argent",
  "Rouge",
  "Verte",
  "Grise",
  "Orange",
  "Bronze",
];

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

  CAR_MODELS = { ...CAR_MODELS, [brand]: modelsList };
  return CAR_MODELS;
});
