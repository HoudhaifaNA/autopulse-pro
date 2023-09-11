import { string, number, object } from "yup";

import wilayas from "data/wilayas.json";

const WILAYAS_OPTIONS = wilayas.map((wilaya) => wilaya.name.toLowerCase());

const schemaLicence = object({
  seller: string()
    .trim()
    .min(3, `Le nom du vendeur doit comporter au moins 3 caractères`)
    .required("Le nom du vendeur est requis"),
  moudjahid: string()
    .trim()
    .min(3, "Le nom du moudjahid doit comporter au moins 3 caractères")
    .required("Le nom du moudjahid est requis"),
  wilaya: string().trim().lowercase().oneOf(WILAYAS_OPTIONS, "La wilaya doit être l'une des options répertoriées."),
  price: number()
    .min(0, ({ min }) => `Minimum ${min} DA`)
    .required("Prix est requis"),
});

export { schemaLicence };
