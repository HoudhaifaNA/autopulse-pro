import React from "react";
import { useFormikContext } from "formik";

import * as S from "components/CarForm/CarType.styled";
import { Body1 } from "styles/Typography";
import Icon from "components/Icon/Icon";

interface CarTypeProps {
  carType: string;
}

const CAR_TYPES = ["importé", "locale"];

const renderCarTypes = (carType: string) => {
  const { setFieldValue, resetForm } = useFormikContext();

  return CAR_TYPES.map((type) => {
    const isSelected = carType === type;
    const onTypeClick = () => {
      resetForm();
      setFieldValue("carType", type);
    };

    return (
      <S.CarType key={type} $selected={isSelected} onClick={onTypeClick}>
        <S.IconWrapper>
          {isSelected && <Icon icon="success" size="2.4rem" />}
        </S.IconWrapper>
        <Icon icon={type} size="4.8rem" />
        <Body1>{type}</Body1>
      </S.CarType>
    );
  });
};

const CarType = ({ carType }: CarTypeProps) => {
  return <S.CarTypeWrapper>{renderCarTypes(carType)}</S.CarTypeWrapper>;
};

export default CarType;
