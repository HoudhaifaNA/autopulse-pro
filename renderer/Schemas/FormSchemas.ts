import { object, string, number } from "yup";

const PASSWORD_RULES = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const PHONE_NUMBER_RULES =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const loginSchema = object({
  username: string()
    .trim()
    .min(4, "Nom d'utilisateur doit être d'au moins 4 caractères")
    .required("Nom d'utilisateur est requis"),
  password: string()
    .trim()
    .min(5, "Mot de passe doit être d'au moins 5 caractères")
    .matches(PASSWORD_RULES, "Mot de passe doit être fort (A-a-1)")
    .required("Mot de pass est requis"),
});

export const clientSchema = object({
  firstName: string()
    .trim()
    .min(3, `Prénom doit comporter au moins 3 caractères`)
    .required("Prénom est requis"),
  lastName: string()
    .trim()
    .min(4, "Nom doit comporter au moins 4 caractères")
    .required("Nom est requis"),
  phoneNumber: string()
    .trim()
    .min(10, "Numéro de téléphone doit comporter au moins 10 chiffres")
    .matches(PHONE_NUMBER_RULES, "Numéro de téléphone est invalide")
    .required("Numéro de téléphone est requis"),
  debt: number().required(),
});
