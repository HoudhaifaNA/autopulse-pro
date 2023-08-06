import { useFormikContext } from "formik";

import { Values } from "components/CarForm/types";
import formatPrice from "utils/formatPrice";

type CostFormula = (
  type: Values["type"] | "à l'étranger",
  euroCost: number,
  euroPrice: number,
  totalCost: number
) => string;

interface ExpensesList {
  [key: string]: string;
}

const costFormula: CostFormula = (type, euroCost, euroPrice, totalCost) => {
  return type !== "locale"
    ? `${formatPrice(euroCost, "€")} × ${formatPrice(
        euroPrice,
        "DA"
      )} = ${formatPrice(totalCost, "DA")}`
    : formatPrice(totalCost, "DA");
};

const getCarDetails = () => {
  const { values } = useFormikContext<Values>();

  const {
    type,
    brand,
    model,
    serialNumber,
    registrationNumber,
    keys,
    mileage,
    color,
    year,
    seller,
    owner,
    expenses,
    costInEuros,
    euroPrice,
    purchasingPrice,
    totalExpensesCost,
    totalEurosAmount,
    totalCost,
  } = values;

  let expensesList: ExpensesList = {};

  // PP ==> Purchasing price
  const PPFormula = costFormula(
    type,
    Number(costInEuros),
    Number(euroPrice),
    Number(purchasingPrice)
  );

  expenses.forEach(({ type, raison, euroCost, totalCost }) => {
    const totalCostFormula = costFormula(
      type,
      Number(euroCost),
      Number(euroPrice),
      Number(totalCost)
    );
    expensesList[raison] = totalCostFormula;
  });

  const carName = `${brand} ${model}`;
  const hasLicence = owner.price >= 0 && owner.id;
  const licencePrice = hasLicence
    ? { "Prix ​​de la licence": formatPrice(owner.price, "DA") }
    : "";

  const carDetails = [
    {
      section: "Détails de la voiture",
      voiture: carName,
      "Numéro de châssis": serialNumber,
      Matricule: registrationNumber,
      Clés: keys,
      Kilométrage: `${mileage} km`,
      Couleur: color,
      Année: year,
    },
    {
      section: "Détails d'achat",
      Vendeur: seller.name,
      "Prix ​​d'achat": PPFormula,
      Propriétaire: owner.name,
      ...licencePrice,
    },
    totalExpensesCost !== 0 && { section: "Dépenses", ...expensesList },
    {
      section: "Calculs totaux",
      "Total en EURO": formatPrice(totalEurosAmount, "€"),
      Total: formatPrice(totalCost, "DA"),
    },
  ];

  return carDetails;
};
export default getCarDetails;
