import { number, object, string } from "yup";

export const expenseSchema = object({
  expense_date: string().required("La date est requise"),
  raison: string().trim().min(3, `Raison doit comporter au moins 3 caractères`).required("Raison est requis"),
  cost: number()
    .min(0, ({ min }) => `Minimum ${min} DA`)
    .required("Coût est requis"),
});
