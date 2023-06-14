import { object, array, string, number, date } from "yup";

import wilayas from "data/wilayas.json";

const PHONE_NUMBER_RULES =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const FULLNAME_RULES = /^[A-Za-z']+(?:\s[A-Za-z']+)*$/;

const WILAYAS_OPTIONS = wilayas.map((wilaya) => wilaya.name.toLowerCase());

const today = new Date();
const currentYear = today.getFullYear();

export const loginSchema = object({
  username: string()
    .trim()
    .matches(FULLNAME_RULES, "Indiquez un nom correct")
    .min(4, "Nom d'utilisateur doit être d'au moins 4 caractères")
    .required("Nom d'utilisateur est requis"),
  password: string()
    .min(4, "Mot de passe doit être d'au moins 4 caractères")
    .required("Mot de pass est requis"),
});

export const updateUsername = object({
  username: string()
    .trim()
    .matches(FULLNAME_RULES, "Indiquez un nom correct")
    .min(4, "Nom d'utilisateur doit être d'au moins 4 caractères")
    .required("Nom d'utilisateur est requis"),
});

export const updateUserPassword = object({
  currentPassword: string()
    .min(4, "Mot de passe doit être d'au moins 4 caractères")
    .required("Mot de passe actuel requis"),
  newPassword: string()
    .min(4, "Mot de passe doit être d'au moins 4 caractères")
    .required("Nouveau mot de passe requis"),
  confirmPassword: string()
    .test({
      name: "Password matching",
      message: "Les mots de passe ne correspondent pas",
      test: function (value) {
        return value === this.parent.newPassword;
      },
    })
    .required("Confirmation du mot de passe requise"),
});

export const clientSchema = object({
  firstName: string()
    .trim()
    .matches(FULLNAME_RULES, "Indiquez un nom correct")
    .min(3, `Prénom doit comporter au moins 3 caractères`)
    .required("Prénom est requis"),
  lastName: string()
    .trim()
    .matches(FULLNAME_RULES, "Indiquez un nom correct")
    .min(3, "Nom doit comporter au moins 3 caractères")
    .required("Nom est requis"),
  phoneNumber: string()
    .trim()
    .min(10, "Numéro de téléphone doit comporter au moins 10 chiffres")
    .matches(PHONE_NUMBER_RULES, "Numéro de téléphone est invalide")
    .required("Numéro de téléphone est requis"),
  balance: number().required("Solde est requis"),
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
  seller: object({
    name: string()
      .trim()
      .matches(FULLNAME_RULES, "Indiquez un nom correct")
      .min(3, `Vendeur doit comporter au moins 3 caractères`)
      .required("Vendeur est requis"),
  }),
  licence: object({
    name: string()
      .trim()
      .matches(FULLNAME_RULES, "Indiquez un nom correct")
      .required("licence est requise"),
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
        .required("Prix ​​de 100 EUR  est requis"),
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
      raison: string()
        .trim()
        .matches(FULLNAME_RULES, "Raison ne doit pas avoir de numéro")
        .required("Raison est requise"),
      euroCost: number().when("type", {
        is: "à l'étranger",
        then: () =>
          number()
            .min(5, ({ min }) => `Minimum ${min} euros`)
            .required("Coût est requis"),
      }),
      euroPrice: number().when("type", {
        is: "à l'étranger",
        then: () =>
          number()
            .min(50, ({ min }) => `Minimum ${min} DZD`)
            .required("Prix ​​de 100 EUR  est requis"),
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
  seller: object({
    name: string()
      .trim()
      .matches(FULLNAME_RULES, "Indiquez un nom correct")
      .min(3, `Vendeur doit comporter au moins 3 caractères`)
      .required("Vendeur est requis"),
  }),
  moudjahid: string()
    .trim()
    .matches(FULLNAME_RULES, "Indiquez un nom correct")
    .min(3, "Moudjahid doit comporter au moins 3 caractères")
    .required("Moudjahid est requis"),
  wilaya: string()
    .trim()
    .lowercase()
    .oneOf(WILAYAS_OPTIONS, "Wilaya doit être l'une des options répertoriées.")
    .required("Wilaya est requis"),
  price: number()
    .min(4000, ({ min }) => `Minimum ${min} DZD`)
    .required("Prix est requis"),
});

export const transactionSchema = object({
  date: date()
    .min(2014, ({ min }) => `La date doit être postérieure à ${min}`)
    .max(today, `La date ne peut pas être postérieure à aujourd'hui`)
    .typeError(() => `La date doit être une date`)
    .required("La date est requise"),
  client: object({
    name: string()
      .trim()
      .matches(FULLNAME_RULES, "Indiquez un nom correct")
      .min(3, `Client doit comporter au moins 3 caractères`)
      .required("Client est requis"),
  }),

  method: string()
    .lowercase()
    .oneOf(
      ["espèces", "chèque", "virement bancaire", "carte de débit"],
      "Méthode doit être l'une des options répertoriées"
    )
    .required("Méthode est requise"),
  amount: number()
    .min(500, ({ min }) => `Minimum ${min} DZD`)
    .integer("Montant doit être un entier")
    .required("Montant est requis"),
  direction: string()
    .oneOf(
      ["entrante", "sortante"],
      "Type doit être l'une des options répertoriées"
    )
    .required("Type de transaction est requis"),
});

export const euroTransferSchema = object({
  date: date()
    .min(2014, ({ min }) => `La date doit être postérieure à ${min}`)
    .max(today, `La date ne peut pas être postérieure à aujourd'hui`)
    .typeError(() => `La date doit être une date`)
    .required("La date est requise"),
  client: object({
    name: string()
      .trim()
      .matches(FULLNAME_RULES, "Indiquez un nom correct")
      .min(3, `Client doit comporter au moins 3 caractères`)
      .required("Client est requis"),
  }),
  amount: number()
    .min(40, ({ min }) => `Minimum ${min} euros`)
    .required("Montant est requis"),
  euroPrice: number()
    .min(50, ({ min }) => `Minimum ${min} DZD`)
    .required("Prix ​​de 100 EUR  est requis"),
  total: number().required("Total est requis"),
  method: string()
    .lowercase()
    .oneOf(
      ["espèces", "chèque", "virement bancaire", "carte de débit"],
      "Méthode doit être l'une des options répertoriées"
    )
    .required("Méthode est requise"),
  direction: string()
    .oneOf(
      ["entrante", "sortante"],
      "Type doit être l'une des options répertoriées"
    )
    .required("Type de transaction est requis"),
});
