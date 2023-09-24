import { object, string } from "yup";

export const changePasswordSchema = object({
  current_password: string()
    .min(4, "Mot de passe doit être d'au moins 4 caractères")
    .required("Mot de pass est requis"),
  new_password: string().min(4, "Mot de passe doit être d'au moins 4 caractères").required("Mot de pass est requis"),
});
