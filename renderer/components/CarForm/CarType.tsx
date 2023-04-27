import React from "react";
import * as S from "components/CarForm/CarType.styled";

import { setFieldValue } from "components/CarForm/types";
import { Body1 } from "styles/Typography";
import Icon from "components/Icon/Icon";

interface CarTypeProps {
  carType: string;
  setFieldValue: setFieldValue;
}

const CAR_TYPES = ["importé", "locale"];

const renderCarTypes = (carType: string, setFieldValue: setFieldValue) => {
  return CAR_TYPES.map((type) => {
    const isSelected = carType === type;

    return (
      <S.CarType
        key={type}
        $selected={isSelected}
        onClick={() => setFieldValue("carType", type)}
      >
        <S.IconWrapper>
          {isSelected && <Icon icon="success" size="2.4rem" />}
        </S.IconWrapper>
        <Icon icon={type} size="4.8rem" />
        <Body1>{type}</Body1>
      </S.CarType>
    );
  });
};

const CarType = ({ carType, setFieldValue }: CarTypeProps) => {
  return (
    <S.CarTypeWrapper>
      {renderCarTypes(carType, setFieldValue)}
    </S.CarTypeWrapper>
  );
};

export default CarType;
