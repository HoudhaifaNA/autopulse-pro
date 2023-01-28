import { FieldInputProps, FieldMetaProps } from "formik";
import * as S from "components/Input/InputContainer.styled";
import { Body2 } from "styles/Typography";
import Icon from "components/Icon/Icon";
import { TypedInputProps } from "./types";

type InputProps = TypedInputProps & {
  meta: FieldMetaProps<any>;
  field: FieldInputProps<any>;
};

const InputAddOn = ({ addOn }: { addOn: string }) => {
  return (
    <S.InputAddOn>
      <Body2>{addOn}</Body2>
    </S.InputAddOn>
  );
};

const InputContainer = (props: InputProps) => {
  const { name, iconLeft, addOn, meta, field, ...allProps } = props;

  // If there is an error icon right should be error icon despite the specified icon
  let { iconRight } = props;
  const isError = meta.error && meta.touched;
  if (isError) iconRight = "error";

  return (
    <S.InputContainer className={isError ? "error" : ""}>
      {addOn && <InputAddOn addOn={addOn} />}
      <S.InputWrapper>
        {iconLeft && <Icon icon={iconLeft} iconSize="1.8rem" />}
        <S.Input id={name} {...allProps} {...field} />
        {iconRight && <Icon icon={iconRight} iconSize="1.8rem" />}
      </S.InputWrapper>
    </S.InputContainer>
  );
};

export default InputContainer;
