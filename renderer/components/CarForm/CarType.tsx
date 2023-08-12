import { useFormikContext } from "formik";

import * as S from "components/CarForm/CarType.styled";
import { Body1 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import { Values } from "components/CarForm/types";
import uid from "utils/uniqid";

const renderCarTypes = () => {
  const { values, setFieldValue, resetForm } = useFormikContext<Values>();
  const { type, step, edit } = values;
  let CAR_TYPES = ["importé", "UAE", "locale"];

  if (edit && type !== "locale") {
    CAR_TYPES = CAR_TYPES.filter((tp) => tp !== "locale");
  }
  if (edit && type === "locale") {
    CAR_TYPES = CAR_TYPES.filter((tp) => tp === "locale");
  }

  return CAR_TYPES.map((carType) => {
    const isSelected = carType === type;

    const onSelect = () => {
      if ((carType === "locale" || type === "locale") && carType !== type) {
        resetForm();
      }
      setFieldValue("type", carType);
      setFieldValue("step", step + 1);
      if (carType === "locale") {
        setFieldValue("expenses", [
          {
            id: uid(),
            type: "locale",
            raison: "Dépense par défaut",
            euroCost: 0,
            totalCost: 1,
          },
        ]);
      }
    };

    return (
      <S.CarType key={carType} $selected={isSelected} onClick={onSelect}>
        <S.IconWrapper>
          {isSelected && <Icon icon="success" size="2.4rem" />}
        </S.IconWrapper>
        <Icon icon={carType.toLowerCase()} size="4.8rem" />
        <Body1>{carType}</Body1>
      </S.CarType>
    );
  });
};

const CarType = () => {
  return <S.CarTypeWrapper>{renderCarTypes()}</S.CarTypeWrapper>;
};

export default CarType;
