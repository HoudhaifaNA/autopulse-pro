import uid from "utils/uniqid";

import { Values } from "components/CarForm/types";

export const INITIAL_VALUES: Values = {
  step: 1,
  created_at: new Date(),
  carType: "importé",
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
  euroCost: "",
  euroPrice: "",
  purchasingPrice: "",
  owner: { id: 0, name: "", price: 0 },
  expenses: [
    {
      id: uid(),
      type: "à l'étranger",
      raison: "",
      euroCost: "",
      euroPrice: "",
      totalCost: "",
    },
  ],
  euroAmount: 0,
  dzdAmount: 0,
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

import cars from "data/cars.json";

import slugify from "utils/slugify";

interface CarModel {
  mainText: string;
}

interface TCarsData {
  [key: string]: CarModel[];
}

// Return car brands list in the dropdown form
export const CAR_BRANDS_LIST = cars.map(({ brand }) => {
  return { mainText: brand, icon: slugify(brand) };
});

// Return car brands with their series to be selected dynamically in the dropdown
// ex: {'mercedes': [{mainText: 'C'},{mainText: 'CLA'}]}
export let CAR_MODELS: TCarsData = {};

cars.forEach(({ brand, models }) => {
  const modelsList = models.map((model) => {
    return { mainText: model };
  });

  CAR_MODELS = { ...CAR_MODELS, [brand]: modelsList };
  return CAR_MODELS;
});
