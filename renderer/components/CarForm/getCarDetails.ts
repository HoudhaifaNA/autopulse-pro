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
    euroAmount,
    euroCost,
    euroPrice,
    purchasingPrice,
    dzdAmount,
  } = values;

  // PP ==> Purchasing price
  const PPText = costToText(
    carType,
    Number(euroCost),
    Number(euroPrice),
    Number(purchasingPrice)
  );

  const [expensesDZDCost] = calcExpensesCost(expenses);

  let expensesList: { [key: string]: string } = {};

  expenses.forEach(({ type, raison, euroPrice, euroCost, totalCost }) => {
    const totalCostText = costToText(
      type,
      Number(euroCost),
      Number(euroPrice),
      Number(totalCost)
    );
    expensesList[raison] = totalCostText;
  });

  const licencePrice = owner.price
    ? { "Prix ​​de la licence": `${owner.price}.00 DZD` }
    : "";

  const carDetails = [
    {
      section: "Détails de la voiture",
      voiture: `${brand} ${model}`,
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
      "Prix ​​d'achat": PPText,
      Propriétaire: owner.name,
      ...licencePrice,
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
