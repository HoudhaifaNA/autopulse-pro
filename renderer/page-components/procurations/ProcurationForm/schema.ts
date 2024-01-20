import { string, number, object } from "yup";

const procurationSchema = object({
  car: string().required().required("Voiture est requis"),
  procurator: string().required().required("Procureur est requis"),
  seller: string().required().required("Vendeur est requis"),
  price: number()
    .min(0, ({ min }) => `Minimum ${min} DA`)
    .required("Prix est requis"),
});

export { procurationSchema };
