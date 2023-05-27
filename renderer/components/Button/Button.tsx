import { MouseEventHandler, ReactNode, Ref, forwardRef } from "react";

import * as S from "components/Button/Button.styled";
import { ButtonText } from "styles/Typography";
import Icon from "components/Icon/Icon";

interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger";
  type?: "submit" | "button" | "reset";
  width?: string;
  icon?: string;
  iconPostition?: "right" | "left";
  floating?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
}

type BtnRef = Ref<HTMLButtonElement | undefined>;

const buttonVariants = {
  primary: S.PrimaryButton,
  secondary: S.SecondaryButton,
  ghost: S.GhostButton,
  danger: S.DangerButton,
};

// Added Ref for react-dropzone issue
const Button = (props: ButtonProps, ref: BtnRef) => {
  // ...allProps will equalt to type and disabled and onClick.
  // we can show them with the element in the browser so we don't use $. ex: type={type}

  const {
    variant,
    width,
    icon,
    iconPostition,
    loading,
    floating,
    children,
    ...allProps
  } = props;

  const SelectedButton = buttonVariants[variant];

  return (
    <SelectedButton
      $iconPosition={iconPostition}
      $floating={floating}
      $width={width}
      {...allProps}
    >
      {icon && <Icon icon={icon} size="2rem" />}
      {children && <ButtonText>{children}</ButtonText>}
      {loading && <S.Loader />}
    </SelectedButton>
  );
};

export default forwardRef(Button);
