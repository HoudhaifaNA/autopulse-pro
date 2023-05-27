import { useField } from "formik";

import * as S from "components/Input/Input.styled";
import { LabelText } from "styles/Typography";

import * as T from "components/Input/types";

const ClickInput = ({ label, disabled, ...props }: T.ClickInputProps) => {
  const [field] = useField(props);
  const id = props.value || props.name;
  const [normalLabel, boldLabel] = label.split("b/");

  return (
    <S.FormGroup $height="4rem" $disabled={disabled}>
      <S.ClickInputContainer>
        <S.ClickInput id={id} {...props} {...field} />
        <LabelText htmlFor={id}>
          {normalLabel}
          <b>{boldLabel}</b>
        </LabelText>
      </S.ClickInputContainer>
    </S.FormGroup>
  );
};

export default ClickInput;
