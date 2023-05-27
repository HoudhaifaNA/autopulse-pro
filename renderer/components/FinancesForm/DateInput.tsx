import { useFormikContext } from "formik";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/fr";

import * as S from "components/FinancesForm/DateInput.styled";
import { LabelText } from "styles/Typography";
import { InputError } from "components/Input/Input.styled";
import Icon from "components/Icon/Icon";
import { Values } from "components/FinancesForm/types";

// Update the months list because the default has lowcase months
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

const DateInput = () => {
  const { values, errors, setFieldValue } = useFormikContext<Values>();
  const hasError = Boolean(errors.date);
  const MIN_DATE = new Date("2014");
  const today = new Date();

  const Label = <LabelText>Date :</LabelText>;
  const DateIcon = <Icon icon="calendar" size="1.8rem" />;
  const DateError = hasError && (
    <InputError>
      <>{errors.date}</>
    </InputError>
  );

  return (
    <S.DateInputWrapper $hasError={hasError}>
      <DatePickerInput
        icon={DateIcon}
        label={Label}
        value={values.date}
        minDate={MIN_DATE}
        maxDate={today}
        monthsListFormat="MMMM"
        weekendDays={[5]}
        firstDayOfWeek={6}
        size="xl"
        locale="fr"
        onChange={(value) => setFieldValue("date", value)}
        autoFocus
      />
      {DateError}
    </S.DateInputWrapper>
  );
};

export default DateInput;
