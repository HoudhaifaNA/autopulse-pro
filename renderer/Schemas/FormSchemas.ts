import { object, array, string, number, date, mixed } from "yup";

import wilayas from "data/wilayas.json";

const PHONE_NUMBER_RULES =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const FULLNAME_RULES = /^[A-Za-z']+(?:\s[A-Za-z']+)*$/;

const WILAYAS_OPTIONS = wilayas.map((wilaya) => wilaya.name.toLowerCase());

const ONE_DAY_IN_MILLISECONDS = 86400000;

const today = new Date(Date.now() + ONE_DAY_IN_MILLISECONDS);
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
  fullName: string()
    .trim()
    .matches(FULLNAME_RULES, "Indiquez un nom correct")
    .min(3, `Nom et prénom doit comporter au moins 3 caractères`)
    .required("Nom et prénom est requis"),
  clientType: string()
    .trim()
    .lowercase()
    .oneOf(["euro", "da"], "Type doit être l'une des options répertoriées")
    .required("Type de client est requis"),
  phoneNumber: string()
    .trim()
    .min(10, "Numéro de téléphone doit comporter au moins 10 chiffres")
    .matches(PHONE_NUMBER_RULES, "Numéro de téléphone est invalide"),
  balance: number().required("Solde est requis"),
});

export const carSchemaStepTwo = object({
  brand: string().trim().required("Marque est requise"),
  model: string().trim().required("Modèle est requis"),
  serialNumber: string().trim().required("Numéro de châssis est requis"),
  registrationNumber: string()
    .trim()
    .required("Numéro d'immatriculation est requis"),
  keys: number()
    .min(1, "Minimum de clés est de 1")
    .max(4, "Maximum de clés est de 4"),
  mileage: number().min(0, "Kilométrage minimum est de 0"),
  color: string().trim().required("Couleur est requise"),
  year: date()
    .min(1950, "Année doit être postérieur à 1950")
    .max(currentYear, `Année doit être antérieur à ${currentYear}`)
    .typeError(() => `Année doit être une date`)
    .required("Année est requise"),
});
export const carSchemaStepFour = object({
  seller: object({
    name: string()
      .trim()
      .matches(FULLNAME_RULES, "Indiquez un nom correct")
      .min(3, `Vendeur doit comporter au moins 3 caractères`)
      .required("Vendeur est requis"),
  }),
  owner: object({
    name: string()
      .trim()
      .matches(FULLNAME_RULES, "Indiquez un nom correct")
      .required("Propriétaire est requise"),
  }),
  costInEuros: number().when("type", {
    is: "importé",
    then: () => number().min(1000, ({ min }) => `Minimum ${min} euros`),
  }),
  euroPrice: number().when("type", {
    is: "importé",
    then: () => number().required("Prix ​​de 100 EUR  est requis"),
  }),

  exchangeTypes: string().when("isExchange", {
    is: true,
    then: () =>
      array()
        .of(mixed().oneOf(["importé", "UAE", "locale"]))
        .min(1, `Type d'échange doit être local ou UAE ouimporté`)
        .required(`Type d'échange doit être local ou UAE ou importé`),
    otherwise: () => array().default([]),
  }),
  purchasingPrice: number().when("type", {
    is: "locale",
    then: () => number().min(20000, ({ min }) => `Minimum ${min}DA`),
  }),
});

export const carSchemaStepFive = object({
  expenses: array().of(
    object({
      raison: string().trim().required("Raison est requise"),
      euroCost: number().when("type", {
        is: "à l'étranger",
        then: () => number().required("Coût est requis"),
      }),
      totalCost: number().when("type", {
        is: "locale",
        then: () => number().required("Coût est requis"),
      }),
    })
  ),
});

export const sellCarSchema = object({
  buyer: object({
    name: string()
      .trim()
      .matches(FULLNAME_RULES, "Indiquez un nom correct")
      .min(3, `Vendeur doit comporter au moins 3 caractères`)
      .required("Vendeur est requis"),
  }),

  soldPrice: number()
    .min(100000, ({ min }) => `Minimum ${min}DA`)
    .required("Prix est requis"),
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
  serialNumber: string().trim(),
  wilaya: string()
    .trim()
    .lowercase()
    .oneOf(WILAYAS_OPTIONS, "Wilaya doit être l'une des options répertoriées."),
  price: number().min(0, ({ min }) => `Minimum ${min}DA`),
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
    .min(500, ({ min }) => `Minimum ${min}DA`)
    .integer("Montant doit être un entier")
    .required("Montant est requis"),
  direction: string()
    .oneOf(
      ["entrante", "sortante"],
      "Type doit être l'une des options répertoriées"
    )
    .required("Type de transaction est requis"),
  type: string()
    .oneOf(
      ["euroTransfer", "DA"],
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
    .min(50, ({ min }) => `Minimum ${min}DA`)
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

export const expenseSchema = object({
  transferred_at: date()
    .min(2015, ({ min }) => `La date doit être postérieure à ${min}`)
    .max(today, `La date ne peut pas être postérieure à aujourd'hui`)
    .typeError(() => `La date doit être une date`)
    .required("La date est requise"),
  type: string()
    .lowercase()
    .oneOf(
      ["locale", "à l'étranger"],
      "Type doit être l'une des options répertoriées"
    ),
  raison: string()
    .trim()
    .min(3, `Raison doit comporter au moins 3 caractères`)
    .required("Raison est requis"),

  amount: number()
    .min(200, ({ min }) => `Minimum ${min} DA`)
    .required("Montant est requis"),
});
