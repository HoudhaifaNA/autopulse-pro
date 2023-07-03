import { useFormikContext } from "formik";

import calcExpensesCost from "utils/calcExpensesCosts";

import { Values } from "components/CarForm/types";

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
  return type === "importé" || type === "à l'étranger"
    ? `${euroCost}.00 € × ${euroPrice}.00 DA = ${totalCost}.00 DA`
    : `${totalCost}.00 DA`;
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

  expenses.forEach(({ type, raison, euroPrice, euroCost, totalCost }) => {
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
    ? { "Prix ​​de la licence": `${owner.price}.00 DA` }
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
      "Total en EURO": `${totalEurosAmount}.00 €`,
      Total: `${totalCost}.00 DA`,
    },
  ];

  return carDetails;
};
export default getCarDetails;
