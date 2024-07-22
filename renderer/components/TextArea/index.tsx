import { KeyboardEvent } from "react";
import { FieldHookConfig, useField, useFormikContext } from "formik";

import * as S from "./styles";
import { LabelText } from "styles/Typography";

interface TextAreaAdditionalProps {
  label: string;
}

type TextAreaProps = TextAreaAdditionalProps & FieldHookConfig<any>;

const TextArea = ({ name, label }: TextAreaProps) => {
  const { submitForm } = useFormikContext();
  const [props] = useField(name);

  const handleSubmit = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.code == "Enter") submitForm();
  };

  return (
    <S.TextAreaWrapper>
      <LabelText>{label}</LabelText>
      <S.TextAreaInput {...props} onKeyDown={handleSubmit} />
    </S.TextAreaWrapper>
  );
};

export default TextArea;
