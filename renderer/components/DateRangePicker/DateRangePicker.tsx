import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DatePickerInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/fr";

import * as S from "./styles";
import Icon from "components/Icon/Icon";

import { deleteParam, setParam } from "store/reducers/resourceUrls";
import { ParamValue, Resources } from "types";
import { useAppSelector } from "store";
import dateToString from "utils/dateToString";

dayjs.extend(updateLocale);
dayjs.updateLocale("fr", {
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
});

interface DateRangePickerProps {
  resource: Resources;
  rangeParam: string;
  label: string;
}

type DateRangeValue = [DateValue | null, DateValue | null];

const getInitialDateRange = (dateRangeParamValue: ParamValue): DateRangeValue => {
  let startDate = null;
  let endDate = null;

  if (dateRangeParamValue && typeof dateRangeParamValue === "string") {
    const dateRangeParts = dateRangeParamValue.split("_");
    if (dateRangeParts.length === 2) {
      startDate = new Date(dateRangeParts[0]);
      endDate = new Date(dateRangeParts[1]);
    }
  }

  return [startDate, endDate];
};

const DateRangePicker = ({ resource, rangeParam, label }: DateRangePickerProps) => {
  const dateRangeParamValue = useAppSelector((state) => state.resourceUrls[resource].params[rangeParam]);
  const dispatch = useDispatch();
  const [selectedRange, setSelectedRange] = useState<DateRangeValue>(getInitialDateRange(dateRangeParamValue));

  const updateDateRange = (rangeText: string) => {
    dispatch(setParam({ resource, paramKey: rangeParam, paramValue: rangeText }));
  };

  useEffect(() => {
    const formattedDates: string[] = [];
    if (selectedRange[0] && selectedRange[1]) {
      selectedRange.forEach((range) => {
        if (range) {
          const newFormat = dateToString(range);
          formattedDates.push(newFormat);
        }
      });
    }
    const rangeText = formattedDates.join("_");

    updateDateRange(rangeText);
  }, [dispatch, selectedRange]);

  const handleDateChange = (value: DateRangeValue) => {
    setSelectedRange(value);
  };
  const clearDateRange = () => {
    setSelectedRange([null, null]);
    dispatch(deleteParam({ resource, paramKey: rangeParam }));
  };

  const ONE_DAY_IN_MILLISECONDS = 86400000;
  const maxDate = new Date(Date.now() + ONE_DAY_IN_MILLISECONDS);

  return (
    <S.Wrapper>
      <DatePickerInput
        type="range"
        icon={<Icon icon="calendar" size="1.8rem" />}
        label={label}
        placeholder="Sélectionnez une plage de dates"
        value={selectedRange}
        defaultValue={[new Date(), null]}
        minDate={new Date(2015)}
        maxDate={maxDate}
        monthsListFormat="MMMM"
        weekendDays={[5]}
        firstDayOfWeek={6}
        size="xl"
        locale="fr"
        onChange={handleDateChange}
        clearable
        clearButtonProps={{ onClick: clearDateRange }}
      />
    </S.Wrapper>
  );
};

export default DateRangePicker;
