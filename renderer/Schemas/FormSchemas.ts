import { object, array, string, number, date } from "yup";

const PASSWORD_RULES = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const PHONE_NUMBER_RULES =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const today = new Date();
const currentYear = today.getFullYear();

const getTodayDate = () => {
  const [day, month, year] = [
    today.getDate() + 1,
    today.getMonth() + 1,
    currentYear,
  ];

  return `${year}-${month}-${day}`;
};

const MAX_DATE = new Date(getTodayDate());

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
    .min(3, "Nom doit comporter au moins 3 caractères")
    .required("Nom est requis"),
  phoneNumber: string()
    .trim()
    .min(10, "Numéro de téléphone doit comporter au moins 10 chiffres")
    .matches(PHONE_NUMBER_RULES, "Numéro de téléphone est invalide")
    .required("Numéro de téléphone est requis"),
  debt: number().required(),
});

export const carSchemaStepTwo = object({
  brand: string().trim().required("Marque est requise"),
  serie: string().trim().required("Série est requise"),
  model: string().trim().required("Modèle est requis"),
  serialNumber: string().trim().required("Numéro de châssis est requis"),
  registrationNumber: string()
    .trim()
    .required("Numéro d'immatriculation est requis"),
  color: string().trim().required("Coleur est requise"),
  year: date()
    .min(1950, "Année doit être postérieur à 1950")
    .max(currentYear, `Année doit être antérieur à ${currentYear}`)
    .typeError(() => `Année doit être une date`)
    .required("Année est requise"),
});
export const carSchemaStepThree = object({
  seller: string()
    .trim()
    .min(3, `Vendeur doit comporter au moins 3 caractères`)
    .required("Vendeur est requis"),
  lisence: object({
    name: string().trim().required("lisence est requise"),
  }),
  euroCost: number().when("carType", {
    is: "importé",
    then: () =>
      number()
        .min(1000, ({ min }) => `Minimum ${min} euros`)
        .required("Prix ​​d'achat est requis"),
  }),
  euroPrice: number().when("carType", {
    is: "importé",
    then: () =>
      number()
        .min(50, ({ min }) => `Minimum ${min} DZD`)
        .required("Prix ​​de 1 EUR  est requis"),
  }),
  purchasingPrice: number().when("carType", {
    is: "locale",
    then: () =>
      number()
        .min(20000, ({ min }) => `Minimum ${min} DZD`)
        .required("Prix ​​d'achat est requis"),
  }),
});

export const carSchemaStepFour = object({
  expenses: array().of(
    object({
      raison: string().trim().required("Raison est requise"),
      euroCost: number().when("type", {
        is: "À l'étranger",
        then: () =>
          number()
            .min(5, ({ min }) => `Minimum ${min} euros`)
            .required("Coût est requis"),
      }),
      euroPrice: number().when("type", {
        is: "À l'étranger",
        then: () =>
          number()
            .min(50, ({ min }) => `Minimum ${min} DZD`)
            .required("Prix ​​de 1 EUR  est requis"),
      }),
      totalCost: number().when("type", {
        is: "locale",
        then: () =>
          number()
            .min(500, ({ min }) => `Minimum ${min} DZD`)
            .required("Coût est requis"),
      }),
    })
  ),
});

export const licenceSchema = object({
  seller: string()
    .trim()
    .min(3, `Vendeur doit comporter au moins 3 caractères`)
    .required("Vendeur est requis"),
  moudjahid: string()
    .trim()
    .min(3, "Moudjahid doit comporter au moins 3 caractères")
    .required("Moudjahid est requis"),
  wilaya: string().trim().required("Wilaya est requis"),
  price: number()
    .min(4000, ({ min }) => `Minimum ${min} DZD`)
    .required(),
});

export const transactionSchema = object({
  date: date()
    .min(2014, ({ min }) => `La date doit être postérieure à ${min}`)
    .max(MAX_DATE, `La date ne peut pas être postérieure à aujourd'hui`)
    .typeError(() => `La date doit être une date`)
    .required("La date est requise"),
  client: string()
    .trim()
    .min(3, `Client doit comporter au moins 3 caractères`)
    .required("Client est requis"),
  method: string()
    .lowercase()
    .oneOf(["espèces", "chèque", "virement bancaire", "carte de débit"])
    .required(),
  amount: number()
    .min(500, ({ min }) => `Minimum ${min} EUR/DZD`)
    .required(),
  type: string().oneOf(["entrante", "sortante"]).required(),
});
