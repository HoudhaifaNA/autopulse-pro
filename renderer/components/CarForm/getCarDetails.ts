import { useFormikContext } from "formik";

import calcExpensesCost from "utils/calcExpensesCosts";

import { Values } from "components/CarForm/types";

type TcostToText = (
  type: Values["carType"] | "à l'étranger",
  euroCost: number,
  euroPrice: number,
  totalCost: number
) => string;

const costToText: TcostToText = (type, euroCost, euroPrice, totalCost) => {
  return type === "importé" || type === "à l'étranger"
    ? `€${euroCost}.00 × ${euroPrice}.00 = ${totalCost}.00 DZD`
    : `${totalCost}.00 DZD`;
};

const getCarDetails = () => {
  const { values } = useFormikContext<Values>();
  const {
    carType,
    brand,
    serie,
    model,
    serialNumber,
    registrationNumber,
    color,
    year,
    seller,
    licence,
    expenses,
    euroAmount,
    euroCost,
    euroPrice,
    purchasingPrice,
    dzdAmount,
  } = values;

  // PP ==> Purchasing price
  const PPText = costToText(carType, euroCost, euroPrice, purchasingPrice);

  const [expensesDZDCost] = calcExpensesCost(expenses);

  let expensesList: { [key: string]: string } = {};

  expenses.forEach(({ type, raison, euroPrice, euroCost, totalCost }) => {
    const totalCostText = costToText(type, euroCost, euroPrice, totalCost);
    expensesList[raison] = totalCostText;
  });

  const carDetails = [
    {
      section: "Détails de la voiture",
      voiture: `${brand} ${serie} ${model}`,
      "Numéro de châssis": serialNumber,
      Matricule: registrationNumber,
      Couleur: color,
      Année: year,
    },
    {
      section: "Détails d'achat",
      Vendeur: seller,
      "Prix ​​d'achat": PPText,
      Licence: licence.name,
      "Prix ​​de la licence": `${licence.price}.00DZD`,
    },
    expensesDZDCost !== 0 && { section: "Dépenses", ...expensesList },
    {
      section: "Calculs totaux",
      "Total en EURO": `€${euroAmount}.00`,
      Total: `${dzdAmount}.00 DZD`,
    },
  ];

  return carDetails;
};
export default getCarDetails;
