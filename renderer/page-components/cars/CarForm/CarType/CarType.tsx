import { useEffect, useState } from "react";
import useSWR from "swr";
import { useFormikContext } from "formik";

import * as S from "./styles";
import { Body1 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import { CarInitialValues } from "../types";
import uid from "utils/uniqid";
import { fetcher } from "utils/API";
import { GetCategories } from "types";

interface CarTypeProps {
  isEdit?: boolean;
}

const renderCarTypes = (isEdit: CarTypeProps["isEdit"]) => {
  const { values, setFieldValue, submitForm } = useFormikContext<CarInitialValues>();
  const { type } = values;
  const { data: categoriesData } = useSWR<GetCategories>("/categories", fetcher);
  const [carTypes, setCarTypes] = useState<string[]>([]);

  useEffect(() => {
    if (categoriesData) {
      const categoriesNames = categoriesData.categories.map(({ name }) => name);
      setCarTypes(categoriesNames);
    }
  }, [categoriesData]);

  return carTypes.map((carType) => {
    const isSelected = carType === type;

    const onSelect = () => {
      setFieldValue("type", carType);
      if (type !== carType && (carType.includes("lcl") || type.includes("lcl"))) {
        setFieldValue("purchase_price_eur", 0);
        setFieldValue("eur_exchange_rate", 0);
        setFieldValue("purchase_price_dzd", 0);
      }
      if (!isEdit && carType.includes("lcl")) {
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
        <Body1>{carType}</Body1>
      </S.CarType>
    );
  });
};

const CarType = ({ isEdit }: CarTypeProps) => {
  return <S.CarTypeWrapper>{renderCarTypes(isEdit)}</S.CarTypeWrapper>;
};

export default CarType;
