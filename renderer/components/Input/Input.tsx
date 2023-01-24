import { useField } from "formik";

import * as S from "components/Input/Input.styled";
import InputContainer from "./InputContainer";
import { LabelText } from "styles/Typography";
import { TypedInputProps, ClickInputProps } from "./types";

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

export const ClickInput = ({ label, disabled, ...props }: ClickInputProps) => {
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  const id = props.value || props.name;
  const renderError = error && touched && <S.InputError>{error}</S.InputError>;

  return (
    <>
      <S.FormGroup $disabled={disabled}>
        <S.ClickInputContainer>
          <S.ClickInput id={id} {...props} {...field} />
          <LabelText htmlFor={id}>{label}</LabelText>
        </S.ClickInputContainer>
        {renderError}
      </S.FormGroup>
    </>
  );
};
