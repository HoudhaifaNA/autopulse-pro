import { string, number, object } from "yup";

const paperSchema = object({
  seller: string()
    .trim()
    .min(3, `Le nom du vendeur doit comporter au moins 3 caractères`)
    .required("Le nom du vendeur est requis"),
  price: number()
    .min(0, ({ min }) => `Minimum ${min} DA`)
    .required("Prix est requis"),
});

export { paperSchema };
