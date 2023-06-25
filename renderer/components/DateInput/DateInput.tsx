import { useFormikContext } from "formik";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/fr";

import * as S from "components/DateInput/DateInput.styled";
import { LabelText } from "styles/Typography";
import { InputError } from "components/Input/Input.styled";
import Icon from "components/Icon/Icon";

interface IDateInput {
  label?: string;
  name: string;
  minDate: string;
  disabled?: boolean;
}

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

const DateInput = ({ label = "Date", name, minDate, disabled }: IDateInput) => {
  const { values, errors, setFieldValue } = useFormikContext<any>();
  const hasError = Boolean(errors[name]);
  const MIN_DATE = new Date(minDate);
  const MAX_DATE = new Date();

  const Label = <LabelText>{label} :</LabelText>;
  const DateIcon = <Icon icon="calendar" size="1.8rem" />;
  const DateError = hasError && (
    <InputError>
      <>{errors[name]}</>
    </InputError>
  );

  return (
    <S.DateInputWrapper $hasError={hasError}>
      <DatePickerInput
        icon={DateIcon}
        label={Label}
        value={values[name]}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        monthsListFormat="MMMM"
        weekendDays={[5]}
        firstDayOfWeek={6}
        size="xl"
        locale="fr"
        onChange={(value) => setFieldValue(name, value)}
        autoFocus
        disabled={disabled}
      />
      {DateError}
    </S.DateInputWrapper>
  );
};

export default DateInput;
