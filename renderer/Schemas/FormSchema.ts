import { object, string } from "yup";

const PASSWORD_RULES = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const LoginSchema = object({
  username: string().required("Nom d'utilisateur est nécessaire"),
  password: string()
    .min(5, "Mot de passe doit être d'au moins 5 caractères")
    .matches(PASSWORD_RULES, "Mot de passe doit être fort (A-a-1)")
    .required("Mot de pass est nécessaire"),
});
