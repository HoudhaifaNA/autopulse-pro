import React from "react";
import * as S from "components/CarForm/PlaceForm.styled";

import { setFieldValue } from "components/CarForm/types";
import { Body1 } from "styles/Typography";
import Icon from "components/Icon/Icon";

interface PlaceFormProps {
  carType: string;
  setFieldValue: setFieldValue;
}

const places = ["importé", "locale"];

const renderPlaces = (carType: string, setFieldValue: setFieldValue) => {
  return places.map((place) => {
    const isSelected = carType === place;

    return (
      <S.PlaceItem
        key={place}
        $selected={isSelected}
        onClick={() => setFieldValue("carType", place)}
      >
        <S.IconWrapper>
          {isSelected && <Icon icon="success" size="2.4rem" />}
        </S.IconWrapper>
        <Icon icon={place} size="4.8rem" />
        <Body1>{place}</Body1>
      </S.PlaceItem>
    );
  });
};

const PlaceForm = ({ carType, setFieldValue }: PlaceFormProps) => {
  return (
    <S.PlaceFormWrapper>
      {renderPlaces(carType, setFieldValue)}
    </S.PlaceFormWrapper>
  );
};

export default PlaceForm;
