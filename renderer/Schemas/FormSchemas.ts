import { object, array, string, number, date, mixed } from "yup";

const FULLNAME_RULES = /^[A-Za-z']+(?:\s[A-Za-z']+)*$/;

const ONE_DAY_IN_MILLISECONDS = 86400000;

const today = new Date(Date.now() + ONE_DAY_IN_MILLISECONDS);

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
    .oneOf(["entrante", "sortante"], "Type doit être l'une des options répertoriées")
    .required("Type de transaction est requis"),
  type: string()
    .oneOf(["euroTransfer", "DA"], "Type doit être l'une des options répertoriées")
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
    .oneOf(["entrante", "sortante"], "Type doit être l'une des options répertoriées")
    .required("Type de transaction est requis"),
});

export const expenseSchema = object({
  transferred_at: date()
    .min(2015, ({ min }) => `La date doit être postérieure à ${min}`)
    .max(today, `La date ne peut pas être postérieure à aujourd'hui`)
    .typeError(() => `La date doit être une date`)
    .required("La date est requise"),
  type: string().lowercase().oneOf(["locale", "à l'étranger"], "Type doit être l'une des options répertoriées"),
  raison: string().trim().min(3, `Raison doit comporter au moins 3 caractères`).required("Raison est requis"),

  amount: number()
    .min(200, ({ min }) => `Minimum ${min} DA`)
    .required("Montant est requis"),
});
