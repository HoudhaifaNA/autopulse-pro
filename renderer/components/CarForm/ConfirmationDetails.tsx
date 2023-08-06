import * as S from "components/CarForm/ConfirmationDetails.styled";
import { Body1, Body2, Heading5 } from "styles/Typography";

import getCarDetails from "components/CarForm/getCarDetails";

const renderCarDetails = () => {
  const carDetails = getCarDetails();

  return carDetails.map((details) => {
    if (details) {
      const { section } = details;

      return (
        <S.Section key={section}>
          <Heading5>{section} :</Heading5>
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

const ConfirmationDetails = () => {
  return <S.ConfirmationWrapper>{renderCarDetails()}</S.ConfirmationWrapper>;
};

export default ConfirmationDetails;
