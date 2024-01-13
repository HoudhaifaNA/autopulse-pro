import { useFormikContext } from "formik";

import { CarInitialValues } from "../types";
import formatFiatValue from "utils/formatFiatValue";
import { calculateTotalCost, calculateTotalEURCost, calculateTotalExpenseCost } from "../utils";

interface ExpensesList {
  [key: string]: string;
}

export const formatEurToDzd = (costInEUR: number, eurExchangeRate: number) => {
  const totalInDZD = costInEUR * (eurExchangeRate / 100);

  return `${formatFiatValue(costInEUR, "EUR")} × ${formatFiatValue(eurExchangeRate, "DZD")} = ${formatFiatValue(
    totalInDZD,
    "DZD"
  )}`;
};

const generateCarConfirmation = () => {
  const { values } = useFormikContext<CarInitialValues>();

  const {
    type,
    brand,
    model,
    serial_number,
    registration_number,
    second_registration_number,
    keys,
    mileage,
    color,
    production_year,
    has_procuration,
    has_gray_card,
    papers_type,
    seller,
    owner_name,
    licence_price,
    purchase_price_eur,
    eur_exchange_rate,
    purchase_price_dzd,
    is_exchange,
    exchange_types,
    expenses,
  } = values;

  let expensesList: ExpensesList = {};

  expenses.forEach(({ type, raison, cost_in_eur, cost_in_dzd }) => {
    if (type.includes("lcl")) {
      expensesList[raison] = formatFiatValue(cost_in_dzd, "DZD");
    } else {
      expensesList[raison] = formatEurToDzd(cost_in_eur, eur_exchange_rate);
    }
  });

  const expenseCost = calculateTotalExpenseCost(expenses);
  const totalEURCost = calculateTotalEURCost(purchase_price_eur, expenses);
  const totalCost = calculateTotalCost(purchase_price_dzd, licence_price, expenses);

  const carDetails = [
    {
      section: "Détails de la voiture",
      type: `${type}`,
      voiture: `${brand} ${model}`,
      "Numéro de châssis": serial_number,
      Matricule: registration_number,
      "Deuxième Matricule": second_registration_number,
      Clés: keys,
      Kilométrage: `${mileage} km`,
      Couleur: color,
      Année: production_year,
      Procuration: has_procuration ? "Oui" : "Non",
      "Cart grise": has_gray_card ? "Oui" : "Non",
      Dossier: papers_type || "--",
    },
    {
      section: "Détails d'achat",
      Vendeur: seller,
      Propriétaire: owner_name,
      "Prix ​​de la licence": formatFiatValue(licence_price, "DZD"),
      Échanger: is_exchange ? "Oui" : "Non",
      "Types de change": Array.isArray(exchange_types) ? exchange_types?.join(", ") : "--",
      "Prix ​​d'achat": type.includes("lcl")
        ? formatFiatValue(purchase_price_dzd, "DZD")
        : formatEurToDzd(purchase_price_eur, eur_exchange_rate),
    },
    expenseCost !== 0 && { section: "Dépenses", ...expensesList },
    {
      section: "Calculs totaux",
      "Total des despenses": formatFiatValue(expenseCost, "DZD"),
      "Total en EURO": formatFiatValue(totalEURCost, "EUR"),
      Total: formatFiatValue(totalCost, "DZD"),
    },
  ];

  return carDetails;
};
export { generateCarConfirmation };
