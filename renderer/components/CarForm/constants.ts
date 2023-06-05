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
export const CAR_BRANDS_LIST = cars
  .sort((prev, curr) => prev.brand.localeCompare(curr.brand))
  .map(({ brand }) => {
    return { mainText: brand, icon: slugify(brand) };
  });

// Return car brands with their series to be selected dynamically in the dropdown
// ex: {'mercedes': [{mainText: 'C'},{mainText: 'CLA'}]}
export let CAR_SERIES: TCarsData = {};

cars.forEach(({ brand, series }) => {
  const seriesList = series.sort(Intl.Collator().compare).map((serie) => {
    return { mainText: serie };
  });

  CAR_SERIES = { ...CAR_SERIES, [brand]: seriesList };
  return CAR_SERIES;
});
