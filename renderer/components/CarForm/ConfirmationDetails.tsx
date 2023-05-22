import * as S from "components/CarForm/ConfirmationDetails.styled";
import { FormContent } from "components/ui/Form.styled";
import { Body1, Body2, Heading5 } from "styles/Typography";

import { ClickInput } from "components/Input/Input";

import getCarDetails from "components/CarForm/getCarDetails";

import { Values } from "components/CarForm/types";

const renderCarDetails = () => {
  const carDetails = getCarDetails();

  return carDetails.map((details) => {
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
  });
};

const ConfirmationDetails = ({ values }: { values: Values }) => {
  return (
    <S.ConfirmationWrapper>
      <FormContent>
        {renderCarDetails()}
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

export default ConfirmationDetails;
