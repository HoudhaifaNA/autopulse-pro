import { useField } from "formik";

import * as S from "components/Input/Input.styled";
import InputContainer from "components/Input/InputContainer";
import {
  TypedInputProps,
  ClickInputProps,
  DropdownInputProps,
} from "components/Input/types";
import { LabelText } from "styles/Typography";

export const TypedInput = ({ label, disabled, ...props }: TypedInputProps) => {
  const [field, meta] = useField(props);
  const inputProps = { field, meta, ...props };

  const { error, touched } = meta;
  const renderError = error && touched && <S.InputError>{error}</S.InputError>;

  return (
    <S.FormGroup $disabled={disabled}>
      <LabelText htmlFor={props.name}>{label}</LabelText>
      <InputContainer {...inputProps} />
      {renderError}
    </S.FormGroup>
  );
};

export const DropdownInput = ({ children }: DropdownInputProps) => {
  // First child is the input, second child is the dropdown
  return <S.DropdownInput>{children}</S.DropdownInput>;
};

export const ClickInput = ({ label, disabled, ...props }: ClickInputProps) => {
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  const id = props.value || props.name;
  const renderError = error && touched && <S.InputError>{error}</S.InputError>;
  const [normalLabel, boldLabel] = label.split("b/");
  return (
    <S.FormGroup $height="fit-content" $disabled={disabled}>
      <S.ClickInputContainer>
        <S.ClickInput id={id} {...props} {...field} />
        <LabelText htmlFor={id}>
          {normalLabel}
          <b>{boldLabel}</b>
        </LabelText>
      </S.ClickInputContainer>
      {renderError}
    </S.FormGroup>
  );
};
