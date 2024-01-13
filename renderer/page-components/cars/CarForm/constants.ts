import { ObjectSchema } from "yup";

import uid from "utils/uniqid";
import slugify from "utils/slugify";
import dateToString from "utils/dateToString";
import { CarInitialValues } from "./types";
import { carSchemaStepTwo, carSchemaStepFour, carSchemaStepFive } from "./schema";

import cars from "data/cars.json";

interface CarModel {
  mainText: string;
}

interface CarsDataType {
  [key: string]: CarModel[];
}
const now = dateToString(new Date());

export const INITIAL_VALUES: CarInitialValues = {
  purchased_at: now,
  type: "",
  brand: "",
  model: "",
  serial_number: "",
  registration_number: "",
  second_registration_number: "",
  keys: 1,
  mileage: 0,
  papers_type: null,
  has_procuration: null,
  has_gray_card: null,
  color: "",
  production_year: "",
  features: "",
  seller_id: 0,
  seller: "",
  owner_id: null,
  owner_name: "",
  licence_price: 0,
  purchase_price_eur: 0,
  eur_exchange_rate: 100,
  purchase_price_dzd: 0,
  is_exchange: 0,
  exchange_types: null,
  expenses: [
    {
      id: uid(),
      type: "à l'étranger",
      raison: "Transitaire étranger",
      cost_in_eur: 0,
      cost_in_dzd: 0,
    },
    {
      id: uid(),
      type: "locale",
      raison: "Transitaire locale",
      cost_in_eur: 0,
      cost_in_dzd: 0,
    },
    {
      id: uid(),
      type: "locale",
      raison: "Dossier",
      cost_in_eur: 0,
      cost_in_dzd: 0,
    },
    {
      id: uid(),
      type: "locale",
      raison: "Procuration",
      cost_in_eur: 0,
      cost_in_dzd: 0,
    },
  ],
};

export const SCHEMAS: { [key: number]: ObjectSchema<object> } = {
  2: carSchemaStepTwo,
  4: carSchemaStepFour,
  5: carSchemaStepFive,
};

const CAR_COLORS = ["Noir", "Bleue", "Argent", "Blanche", "Grise"];

export const COLORS_LIST = CAR_COLORS.map((color) => {
  return {
    icon: color.toLowerCase(),
    mainText: color,
  };
});

export const CAR_BRANDS_LIST = cars.map(({ brand }) => {
  return { mainText: brand, icon: slugify(brand) };
});

export let CAR_MODELS: CarsDataType = {};

cars.forEach(({ brand, models }) => {
  const modelsList = models.map((model) => {
    return { mainText: model };
  });

  CAR_MODELS = { ...CAR_MODELS, [brand.toLowerCase()]: modelsList };
  return CAR_MODELS;
});
