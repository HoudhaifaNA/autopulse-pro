import { useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import { LabelText } from "styles/Typography";
import Button from "components/Button/Button";

import { deleteParam, setParam } from "store/reducers/resourceUrls";
import { useAppSelector } from "store";
import { ParamValue, Resources } from "types";

interface AmountRangeProps {
  resource: Resources;
  rangeParam: string;
  label: string;
}

const getInitialAmountRange = (amountRangeParamValue: ParamValue) => {
  let minAmount = "";
  let maxAmount = "";

  if (amountRangeParamValue && typeof amountRangeParamValue === "string") {
    const amountRangeParts = amountRangeParamValue.split("_");
    minAmount = amountRangeParts[0];
    maxAmount = amountRangeParts[1];
  }

  return [minAmount, maxAmount];
};

const AmountRange = ({ resource, rangeParam, label }: AmountRangeProps) => {
  const rangeParamValue = useAppSelector((state) => state.resourceUrls[resource].params[rangeParam]);
  const dispatch = useDispatch();

  const [initialMinAmount, initialMaxAmount] = getInitialAmountRange(rangeParamValue);
  const [minAmount, setMinAmount] = useState<string>(initialMinAmount);
  const [maxAmount, setMaxAmount] = useState<string>(initialMaxAmount);
  const amountRange = [minAmount, maxAmount].join("_");

  const onBlurFilter = () => {
    dispatch(setParam({ resource, paramKey: rangeParam, paramValue: amountRange }));
  };

  const clearRange = () => {
    dispatch(deleteParam({ resource, paramKey: rangeParam }));
    setMinAmount("");
    setMaxAmount("");
  };

  return (
    <S.AmountRangeWrapper>
      {amountRange.length > 1 && (
        <Button variant="ghost" onClick={clearRange}>
          Effacer
        </Button>
      )}
      <S.RangeInputList>
        <S.RangeInputGroup>
          <LabelText>{label} minimum :</LabelText>
          <S.RangeInput
            type="number"
            value={minAmount}
            placeholder="-10000000"
            onChange={(e) => setMinAmount(e.target.value)}
            onBlur={onBlurFilter}
          />
        </S.RangeInputGroup>
        <S.RangeInputGroup>
          <LabelText>{label} maximum :</LabelText>
          <S.RangeInput
            type="number"
            value={maxAmount}
            placeholder="10000000"
            onChange={(e) => setMaxAmount(e.target.value)}
            onBlur={onBlurFilter}
          />
        </S.RangeInputGroup>
      </S.RangeInputList>
    </S.AmountRangeWrapper>
  );
};

export default AmountRange;
