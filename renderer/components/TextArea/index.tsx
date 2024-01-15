import { FieldHookConfig, useField } from "formik";

import * as S from "./styles";
import { LabelText } from "styles/Typography";

interface TextAreaAdditionalProps {
  label: string;
}

type TextAreaProps = TextAreaAdditionalProps & FieldHookConfig<any>;

const TextArea = ({ name, label }: TextAreaProps) => {
  const [props] = useField(name);

  return (
    <S.TextAreaWrapper>
      <LabelText>{label}</LabelText>
      <S.TextAreaInput {...props} />
    </S.TextAreaWrapper>
  );
};

export default TextArea;
