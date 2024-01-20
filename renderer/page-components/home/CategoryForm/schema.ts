import { string, object } from "yup";

const schemaCategory = object({
  name: string().trim().required("Le nom du category est requis"),
});

export { schemaCategory };
