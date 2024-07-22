import { number, object } from "yup";

const schema = object({
  eur_exchange_rate: number().required("Prix de 100 € est requis"),
});

export { schema };
