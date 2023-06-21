import { FieldInputProps, FieldMetaProps } from "formik";

import * as S from "components/Input/InputContainer.styled";
import { Body2 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import { TypedInputProps } from "components/Input/types";

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
  let {
    name,
    leftIcon,
    rightIcon,
    addOn,
    meta,
    field,
    onIconClick,
    ...allProps
  } = props;

  // If there is an error icon right should be the error icon despite the specified icon
  const isError = meta.error && meta.touched;
  if (isError) rightIcon = "error";

  return (
    <S.InputContainer className={isError ? "error" : ""}>
      <S.InputWrapper>
        {leftIcon && (
          <S.InputIcon>
            <Icon icon={leftIcon} size="1.8rem" />
          </S.InputIcon>
        )}
        <S.Input id={name} {...allProps} {...field} />
        {rightIcon && (
          <S.InputIcon onClick={onIconClick}>
            <Icon icon={rightIcon} size="1.8rem" />
          </S.InputIcon>
        )}
      </S.InputWrapper>
      {addOn && <InputAddOn addOn={addOn} />}
    </S.InputContainer>
  );
};

export default InputContainer;
