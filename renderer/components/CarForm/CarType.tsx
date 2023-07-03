import { useFormikContext } from "formik";

import * as S from "components/CarForm/CarType.styled";
import { Body1 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import { Values } from "components/CarForm/types";

const CAR_TYPES = ["importé", "locale"];

const renderCarTypes = () => {
  const { values, setFieldValue, resetForm } = useFormikContext<Values>();
  const { type, step } = values;

  return CAR_TYPES.map((carType) => {
    const isSelected = carType === type;

    const onSelect = () => {
      if (!isSelected) resetForm();
      setFieldValue("type", carType);
      setFieldValue("step", step + 1);
    };

    return (
      <S.CarType key={carType} $selected={isSelected} onClick={onSelect}>
        <S.IconWrapper>
          {isSelected && <Icon icon="success" size="2.4rem" />}
        </S.IconWrapper>
        <Icon icon={carType} size="4.8rem" />
        <Body1>{carType}</Body1>
      </S.CarType>
    );
  });
};

const CarType = () => {
  return <S.CarTypeWrapper>{renderCarTypes()}</S.CarTypeWrapper>;
};

export default CarType;
