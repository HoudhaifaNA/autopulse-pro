import { useField } from "formik";
import { MultiSelect } from "@mantine/core";

import * as S from "components/Input/Input.styled";

import * as T from "components/Input/types";
import { LabelText } from "styles/Typography";

const MultiSelectInput = ({ label, className, options, ...props }: T.MultiSelectInputProps) => {
  const [field, meta, helpers] = useField(props);

  const { error } = meta;
  const hasError = Boolean(error);

  const Label = <LabelText>{label} :</LabelText>;
  const FieldError = hasError && <S.InputError>{error}</S.InputError>;

  return (
    <S.MultiSelectWrapper $hasError={Boolean(error)}>
      <MultiSelect label={Label} {...field} data={options} onChange={(values) => helpers.setValue(values)} />
      {FieldError}
    </S.MultiSelectWrapper>
  );
};

export default MultiSelectInput;
