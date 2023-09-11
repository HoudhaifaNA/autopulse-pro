import { string, number, object } from "yup";

const PHONE_NUMBER_RULES = /^(\+\d{1,3}[- ]?)?(\d{10}(,|$))+$/;

const clientSchema = object({
  full_name: string()
    .trim()
    .min(3, "Le nom et prénom doivent comporter au moins 3 caractères")
    .required("Le nom et prénom est requis"),
  email: string().trim().min(3, "L'adresse e-mail doit comporter au moins 3 caractères"),
  address: string().trim().min(3, "L'adresse doit comporter au moins 3 caractères"),
  phone: string()
    .trim()
    .min(10, "Le numéro de téléphone doit comporter au moins 10 chiffres")
    .matches(PHONE_NUMBER_RULES, "Le numéro de téléphone est invalide"),
  dzd_balance: number().required("Le solde DZD est requis"),
  eur_balance: number().required("Le solde EUR est requis"),
});

export default clientSchema;
