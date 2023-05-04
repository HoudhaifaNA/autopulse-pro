import * as S from "components/CarForm/ConfirmationDetails.styled";

import { FormContent } from "components/ui/Form.styled";
import { Values } from "components/CarForm/types";
import { Body1, Body2, Heading5 } from "styles/Typography";
import { ClickInput } from "components/Input/Input";
import calcExpensesCost from "utils/calcExpensesCosts";

type costToTextT = (
  type: Values["carType"] | "À l'étranger",
  euroCost: number,
  euroPrice: number,
  totalCost: number
) => string;

const ConfirmationDetails = ({ values }: { values: Values }) => {
  const carDetails = getCarDetails(values);
  return (
    <S.ConfirmationWrapper>
      <FormContent>
        {carDetails.map((details) => {
          if (details) {
            return (
              <S.Section key={details.section}>
                <Heading5>{details.section} :</Heading5>
                {Object.entries(details).map(([key, value]) => {
                  if (key !== "section") {
                    return (
                      <S.SectionItem key={key}>
                        <Body1>{key} :</Body1>
                        <Body2>{value}</Body2>
                      </S.SectionItem>
                    );
                  }
                })}
              </S.Section>
            );
          }
        })}

        <ClickInput
          type="checkbox"
          name="transactionAgreement"
          //  [b/] for bolding text
          label={`Ajouter cette voiture aux transactions de b/${values.seller}`}
        />
      </FormContent>
    </S.ConfirmationWrapper>
  );
};

const costToText: costToTextT = (type, euroCost, euroPrice, totalCost) => {
  return type === "importé" || type === "À l'étranger"
    ? `€${euroCost}.00 × ${euroPrice}.00 = ${totalCost}.00 DZD`
    : `${totalCost}.00 DZD`;
};

const getCarDetails = (values: Values) => {
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
    lisence,
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
      Licence: lisence.name,
      "Prix ​​de la licence": `${lisence.price}.00DZD`,
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

export default ConfirmationDetails;
