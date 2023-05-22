import { useField } from "formik";

import * as S from "components/Input/Input.styled";
import { LabelText } from "styles/Typography";

import InputContainer from "components/Input/InputContainer";

import * as T from "components/Input/types";

const TypedInput = ({
  label,
  disabled,
  className,
  ...props
}: T.TypedInputProps) => {
  const [field, meta] = useField(props);
  const inputProps = { field, meta, ...props };

  const { error, touched } = meta;
  const renderError = error && touched && <S.InputError>{error}</S.InputError>;

  return (
    <S.FormGroup $disabled={disabled} className={className}>
      <LabelText htmlFor={props.name}>{label}</LabelText>
      <InputContainer {...inputProps} />
      {renderError}
    </S.FormGroup>
  );
};

export default TypedInput;
