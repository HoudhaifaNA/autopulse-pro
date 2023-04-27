import * as S from "components/CarForm/ConfirmationDetails.styled";

import { FormContent } from "components/ui/Form.styled";
import { Values } from "components/CarForm/types";
import { Body1, Body2, Heading5 } from "styles/Typography";
import { ClickInput } from "components/Input/Input";

interface ConfirmationProps {
  values: Values;
}

const formatTotalCost = (
  type: Values["carType"] | "À l'étranger",
  euroCost: number,
  euroPrice: number,
  totalCost: number
) => {
  return type === "importé" || type === "À l'étranger"
    ? `€${euroCost}.00 × ${euroPrice}.00 = ${totalCost}.00 DZD`
    : `${totalCost}.00 DZD`;
};

const ConfirmationDetails = ({ values }: ConfirmationProps) => {
  const {
    carType,
    brand,
    serie,
    model,
    euroPrice,
    euroCost,
    purchasingPrice,
    totalCost,
  } = values;

  const carPurchasingPriceText = formatTotalCost(
    carType,
    euroCost,
    euroPrice,
    purchasingPrice
  );

  const expensesEuroCost = values.expenses.reduce((a, b) => {
    return a + b.euroCost;
  }, 0);

  const carEuroCost = euroCost + expensesEuroCost;

  const carDetails = [
    {
      sectionName: "Détails de la voiture",
      items: [
        {
          label: "Voiture",
          value: `${brand} ${serie} ${model}`,
        },
        {
          label: "Numéro de châssis",
          value: values.serialNumber,
        },
        {
          label: "Matricule",
          value: values.registrationNumber,
        },
        {
          label: "Couleur",
          value: values.color,
        },
        {
          label: "Année",
          value: values.year,
        },
      ],
    },
    {
      sectionName: "Détails d'achat",
      items: [
        {
          label: "Vendeur",
          value: values.seller,
        },
        {
          label: "Prix ​​d'achat",
          value: carPurchasingPriceText,
        },
        {
          label: "Licence",
          value: values.lisence,
        },
        {
          label: "Prix ​​de la licence",
          value: "45000.00 DZD",
        },
      ],
    },
    {
      sectionName: "Dépenses",
      items: values.expenses.map(
        ({ type, raison, euroPrice, euroCost, totalCost }) => {
          return {
            label: raison,
            value: formatTotalCost(type, euroCost, euroPrice, totalCost),
          };
        }
      ),
    },
    {
      sectionName: "Calculs totaux",
      items: [
        {
          label: "Total en EURO",
          value: `€${carEuroCost}.00`,
        },
        {
          label: "Total",
          value: `${totalCost}.00 DZD`,
        },
      ],
    },
  ];
  return (
    <S.ConfirmationWrapper>
      <FormContent>
        {carDetails.map(({ sectionName, items }) => {
          return (
            <S.Section key={sectionName}>
              <Heading5>{sectionName} :</Heading5>
              {items.map(({ label, value }) => {
                return (
                  <S.SectionItem key={label}>
                    <Body1>{label} :</Body1>
                    <Body2>{value}</Body2>
                  </S.SectionItem>
                );
              })}
            </S.Section>
          );
        })}
        <ClickInput
          type="checkbox"
          name="transactionAG"
          label={`Ajouter cette voiture aux transactions de ${values.seller}`}
        />
      </FormContent>
    </S.ConfirmationWrapper>
  );
};

export default ConfirmationDetails;
