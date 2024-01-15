import { object, array, string, number, date, mixed } from "yup";

const ONE_DAY_IN_MILLISECONDS = 86400000;

const today = new Date(Date.now() + ONE_DAY_IN_MILLISECONDS);
const currentYear = today.getFullYear();

export const carSchemaStepOne = object({
  type: string().required(),
});

export const carSchemaStepTwo = object({
  brand: string().trim().required("La marque est requise."),
  model: string().trim().required("Le modèle est requis."),
  serial_number: string().trim().required("Le numéro de châssis est requis."),
  registration_number: string().trim().required("Le numéro d'immatriculation est requis."),
  keys: number().min(1, "Minimum de clés est 1.").max(4, "Maximum de clés est 4."),
  mileage: number().min(0, "Le kilométrage minimum est 0."),
  color: string().trim().required("La couleur est requise."),
  production_year: date()
    .min(1950, "L'année doit être après 1950.")
    .max(currentYear, `L'année doit être avant ${currentYear}.`)
    .typeError(() => "L'année doit être une date.")
    .required("L'année est requise."),
});

export const carSchemaStepFour = object({
  seller: string()
    .trim()
    .min(3, `Le nom du vendeur doit comporter au moins 3 caractères.`)
    .required("Le nom du vendeur est requis."),

  owner_name: string().trim().required("Le nom du propriétaire est requis."),

  purchase_price_eur: number().when("type", {
    is: (val: string) => val && val.includes("lcl"),
    then: () => number(),
    otherwise: () => number().required("Le prix d'achat en euros est requis."),
  }),

  eur_exchange_rate: number().when("type", {
    is: (val: string) => val && val.includes("lcl"),
    then: () => number(),
    otherwise: () => number().required("Le taux de change euro est requis."),
  }),

  purchase_price_dzd: number().when("type", {
    is: (val: string) => val && val.includes("lcl"),
    then: () => number().required("Le prix d'achat en DZD est requis."),
  }),
});

export const carSchemaStepFive = object({
  expenses: array().of(
    object({
      raison: string().trim().required("La raison est requise."),
      cost_in_eur: number().when("type", {
        is: "à l'étranger",
        then: () => number().required("Le coût en euros est requis."),
      }),
      cost_in_dzd: number().required("Le coût est requis."),
    })
  ),
});
