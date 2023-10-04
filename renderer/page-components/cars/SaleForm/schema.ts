import { number, object, string } from "yup";

const schema = object({
  buyer: string().trim().min(3, `Vendeur doit comporter au moins 3 caractères`).required("Vendeur est requis"),

  sold_price: number().required("Prix est requis"),
});

export { schema };
