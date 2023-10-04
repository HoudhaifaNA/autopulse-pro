import { useEffect, useState } from "react";
import { YearPickerInput } from "@mantine/dates";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import Icon from "components/Icon/Icon";

import { deleteParam, setParam } from "store/reducers/resourceUrls";
import { Resources } from "types";
import { useAppSelector } from "store";

interface YearsPickerInputProps {
  label: string;
  resource: Resources;
  yearsParam: string;
}

const YearsPickerInput = ({ label, yearsParam, resource }: YearsPickerInputProps) => {
  const filtredYears = useAppSelector((state) => state.resourceUrls[resource].params[yearsParam]);
  let defaultYears: Date[] = [];
  if (filtredYears && typeof filtredYears === "string") {
    defaultYears = filtredYears.split(", ").map((year) => {
      return new Date(year);
    });
  }

  const [years, setYears] = useState<Date[]>(defaultYears);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedYears(years.map((date) => date.getFullYear()));
  }, [years]);

  useEffect(() => {
    if (selectedYears.length > 0) {
      dispatch(setParam({ resource, paramKey: yearsParam, paramValue: selectedYears.join(", ") }));
    }
  }, [selectedYears]);

  const clearYears = () => {
    setYears([]);
    setSelectedYears([]);
    dispatch(deleteParam({ resource, paramKey: yearsParam }));
  };

  return (
    <S.Wrapper>
      <YearPickerInput
        type="multiple"
        icon={<Icon icon="calendar" size="1.8rem" />}
        label={label}
        placeholder="Sélectionnez les années"
        value={years}
        onChange={setYears}
        maxDate={new Date(`${new Date().getFullYear()}`)}
        size="xl"
        clearable
        clearButtonProps={{ onClick: clearYears }}
      />
    </S.Wrapper>
  );
};

export default YearsPickerInput;
