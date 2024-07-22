import { string, number, object } from "yup";

const paperSchema = object({
  seller: string().trim().required("Le nom du vendeur est requis"),
  owner: string().trim().required("Le nom du propriétaire est requis"),
  price: number()
    .min(0, ({ min }) => `Minimum ${min} DA`)
    .required("Prix est requis"),
});

export { paperSchema };
