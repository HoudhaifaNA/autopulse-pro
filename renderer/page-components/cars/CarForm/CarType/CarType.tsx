import { useFormikContext } from "formik";

import * as S from "./styles";
import { Body1 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import { CarInitialValues } from "../types";
import uid from "utils/uniqid";

interface CarTypeProps {
  isEdit?: boolean;
}

const renderCarTypes = (isEdit: CarTypeProps["isEdit"]) => {
  const { values, setFieldValue, submitForm } = useFormikContext<CarInitialValues>();
  const { type } = values;
  const CAR_TYPES = ["europe", "dubai", "locale"];

  return CAR_TYPES.map((carType) => {
    const isSelected = carType === type;

    const onSelect = () => {
      setFieldValue("type", carType);
      if (type !== carType && (carType === "locale" || type === "locale")) {
        setFieldValue("purchase_price_eur", 0);
        setFieldValue("eur_exchange_rate", 0);
        setFieldValue("purchase_price_dzd", 0);
      }
      if (!isEdit && carType === "locale") {
        setFieldValue("expenses", [
          {
            id: uid(),
            type: "locale",
            raison: "Dépense par défaut",
            cost_in_eur: 0,
            cost_in_dzd: 0,
          },
        ]);
      }
      submitForm();
    };

    return (
      <S.CarType key={carType} $selected={isSelected} onClick={onSelect}>
        <S.IconWrapper>{isSelected && <Icon icon="success" size="2.4rem" />}</S.IconWrapper>
        <Icon icon={carType.toLowerCase()} size="4.8rem" />
        <Body1>{carType}</Body1>
      </S.CarType>
    );
  });
};

const CarType = ({ isEdit }: CarTypeProps) => {
  return <S.CarTypeWrapper>{renderCarTypes(isEdit)}</S.CarTypeWrapper>;
};

export default CarType;
