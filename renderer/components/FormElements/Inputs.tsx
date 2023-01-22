import { FieldHookConfig, useField } from "formik";
import * as InputStyles from "components/FormElements/Input.styled";
import { Body2, LabelText } from "styles/Typography";
import Icon from "components/Icon/Icon";

type InputProps = {
  label: string;
  iconLeft?: string;
  iconRight?: string;
  addOn?: string;
} & FieldHookConfig<any>;

export const TextInput = (props: InputProps) => {
  const { label, iconLeft, iconRight, addOn, ...allProps } = props;
  const [field, meta] = useField(allProps);
  let icon = iconRight;
  if (meta.error && meta.touched) icon = "error";
  return (
    <InputStyles.FormGroup $direction="column">
      <LabelText>{label}</LabelText>
      <InputStyles.InputContainer $error={icon === "error"}>
        {addOn && (
          <InputStyles.InputAddOn>
            <Body2>{addOn}</Body2>
          </InputStyles.InputAddOn>
        )}
        <InputStyles.InputWrapper $error={icon === "error"}>
          {iconLeft && <Icon icon={iconLeft} />}
          <InputStyles.Input {...allProps} {...field} />

          {icon && <Icon icon={icon} />}
          {/* {meta.error && <Icon icon="error" />} */}
        </InputStyles.InputWrapper>
      </InputStyles.InputContainer>
      {meta.touched && meta.error && <p>{meta.error}</p>}
    </InputStyles.FormGroup>
  );
};

export const Checkbox = ({ label, ...props }: InputProps) => {
  const [field] = useField(props);

  return (
    <InputStyles.FormGroup $direction="row">
      <InputStyles.Checkbox {...props} {...field} />
      <LabelText>{label}</LabelText>
    </InputStyles.FormGroup>
  );
};
