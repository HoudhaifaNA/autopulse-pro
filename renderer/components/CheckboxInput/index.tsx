import { useFormikContext } from "formik";

import * as S from "./styles";
import Checkbox from "components/Checkbox/Checkbox";
import { LabelText } from "styles/Typography";
import { InputError } from "components/Input/Input.styled";

interface CheckboxOption {
  label: string;
  value: string | number | null;
}

export interface CheckboxInputProps {
  name: string;
  label: string;
  options: CheckboxOption[];
  isMultiple?: boolean;
}

const CheckboxInput = ({ label, name, options, isMultiple = false }: CheckboxInputProps) => {
  const { values, setFieldValue, errors } = useFormikContext<any>();

  const renderCheckboxes = () => {
    return options.map(({ label, value }) => {
      let isChecked: boolean = false;

      if (isMultiple && values[name]) {
        isChecked = values[name].includes(value);
      } else {
        isChecked = values[name] === value;
      }

      const onSelect = () => {
        if (isMultiple && !values[name]) {
          setFieldValue(name, [value]);
        } else if (isMultiple && values[name]) {
          if (isChecked) {
            setFieldValue(
              name,
              values[name].filter((op: string) => op !== value)
            );
          } else {
            setFieldValue(name, [...values[name], value]);
          }
        }

        if (!isMultiple) {
          if (isChecked) {
            setFieldValue(name, null);
          } else {
            setFieldValue(name, value);
          }
        }
      };
      return <Checkbox label={label} isChecked={isChecked} check={onSelect} key={value} />;
    });
  };

  return (
    <S.CheckboxesWrapper>
      <S.CheckboxGroup>
        <LabelText>{label}</LabelText>
        <S.CheckboxList>{renderCheckboxes()}</S.CheckboxList>
      </S.CheckboxGroup>
      {errors[name] && typeof errors[name] === "string" && <InputError>{`${errors[name]}`}</InputError>}
    </S.CheckboxesWrapper>
  );
};

export default CheckboxInput;
