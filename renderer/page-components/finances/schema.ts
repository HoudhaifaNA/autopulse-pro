import { number, object, string } from "yup";

export const transactionSchema = object({
  client: string().trim().min(3, `Client doit comporter au moins 3 caractères`).required("Client est requis"),
  info2: string()
    .lowercase()
    .oneOf(
      ["espèces", "chèque", "virement bancaire", "carte de débit"],
      "Méthode doit être l'une des options répertoriées"
    )
    .required("Méthode est requise"),
  amount: number()
    .min(0, ({ min }) => `Minimum ${min} DA`)
    .integer("Montant doit être un entier")
    .required("Montant est requis"),
  direction: string()
    .oneOf(["entrante", "sortante"], "Type doit être l'une des options répertoriées")
    .required("Type de transaction est requis"),
});
