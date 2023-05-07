import { MouseEventHandler, ReactNode } from "react";

import * as S from "components/Buttons/Button.styled";
import { ButtonText } from "styles/Typography";
import Icon from "components/Icon/Icon";

export interface ButtonProps {
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

const buttonVariants = {
  primary: S.PrimaryButton,
  secondary: S.SecondaryButton,
  ghost: S.GhostButton,
  danger: S.DangerButton,
};

const Button = (props: ButtonProps) => {
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

export default Button;
