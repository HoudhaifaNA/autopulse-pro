import { string, object } from "yup";

const deliverProcurationSchema = object({
  recipient: string().required("Destinataire est requis"),
});

export { deliverProcurationSchema };
