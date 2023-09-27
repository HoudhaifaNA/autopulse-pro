import { MouseEventHandler, ReactNode, Ref } from "react";

import * as S from "components/Button/Button.styled";
import { ButtonText } from "styles/Typography";
import Icon from "components/Icon/Icon";

interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger";
  type?: "submit" | "button" | "reset";
  id?: string;
  width?: string;
  icon?: string;
  iconPostition?: "right" | "left";
  floating?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ref?: Ref<HTMLButtonElement>;
}

const buttonVariants = {
  primary: S.PrimaryButton,
  secondary: S.SecondaryButton,
  ghost: S.GhostButton,
  danger: S.DangerButton,
};

const Button = (props: ButtonProps) => {
  const { variant, width, icon, iconPostition, loading, floating, children, ...allProps } = props;

  const SelectedButton = buttonVariants[variant];

  return (
    <SelectedButton $iconPosition={iconPostition} $floating={floating} $width={width} {...allProps}>
      {icon && <Icon icon={icon} size="2rem" />}
      {children && <ButtonText>{children}</ButtonText>}
      {loading && <S.Loader />}
    </SelectedButton>
  );
};

export default Button;
