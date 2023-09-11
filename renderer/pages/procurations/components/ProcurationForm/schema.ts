import { string, number, object } from "yup";

const procurationSchema = object({
  moudjahid: string()
    .trim()
    .min(3, `Le nom du moudjahid doit comporter au moins 3 caractères`)
    .required("Le nom du moudjahid est requis"),
  price: number()
    .min(0, ({ min }) => `Minimum ${min} DA`)
    .required("Prix est requis"),
});

export default procurationSchema;
