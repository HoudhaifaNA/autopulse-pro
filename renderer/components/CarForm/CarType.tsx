import { useFormikContext } from "formik";

import * as S from "components/CarForm/CarType.styled";
import { Body1 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import { Values } from "components/CarForm/types";

const CAR_TYPES = ["importé", "locale"];

const renderCarTypes = (carType: Values["carType"]) => {
  const { setFieldValue, values, resetForm } = useFormikContext<Values>();

  return CAR_TYPES.map((type) => {
    const isSelected = carType === type;
    const onTypeClick = () => {
      if (carType !== type) resetForm();
      setFieldValue("carType", type);
      setFieldValue("step", values.step + 1);
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

const CarType = () => {
  const { values } = useFormikContext<Values>();
  const { carType } = values;

  return <S.CarTypeWrapper>{renderCarTypes(carType)}</S.CarTypeWrapper>;
};

export default CarType;
