import { object, string } from "yup";

export const loginSchema = object({
  username: string()
    .trim()
    .min(4, "Nom d'utilisateur doit être d'au moins 4 caractères")
    .required("Nom d'utilisateur est requis"),
  password: string().min(4, "Mot de passe doit être d'au moins 4 caractères").required("Mot de pass est requis"),
});
