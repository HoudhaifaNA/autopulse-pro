import { string, object } from "yup";

const deliverPaperSchema = object({
  recipient: string().required("Destinataire est requis"),
});

export { deliverPaperSchema };
