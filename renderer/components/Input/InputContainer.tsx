import { FieldInputProps, FieldMetaProps } from "formik";

import * as S from "components/Input/InputContainer.styled";
import { TypedInputProps } from "components/Input/types";
import { Body2 } from "styles/Typography";
import Icon from "components/Icon/Icon";

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
  const { name, iconLeft, addOn, meta, field, onIconClick, ...allProps } =
    props;

  // If there is an error icon right should be the error icon despite the specified icon
  let { iconRight } = props;
  const isError = meta.error && meta.touched;
  if (isError) iconRight = "error";

  return (
    <S.InputContainer className={isError ? "error" : ""}>
      {addOn && <InputAddOn addOn={addOn} />}
      <S.InputWrapper>
        {iconLeft && <Icon icon={iconLeft} size="1.8rem" />}
        <S.Input id={name} {...allProps} {...field} />
        {iconRight && (
          <div onClick={onIconClick}>
            <Icon icon={iconRight} size="1.8rem" />
          </div>
        )}
      </S.InputWrapper>
    </S.InputContainer>
  );
};

export default InputContainer;
