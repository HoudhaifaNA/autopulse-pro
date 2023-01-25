import { MouseEventHandler } from "react";
import * as S from "components/Buttons/Button.styled";
import { ButtonText } from "styles/Typography";
import Icon from "components/Icon/Icon";

export interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  type?: "submit" | "button" | "reset" | undefined;
  icon?: string;
  iconPostition?: "right" | "left";
  floating?: boolean;
  disabled?: boolean;
  children?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const buttonVariants = {
  primary: S.PrimaryButton,
  secondary: S.SecondaryButton,
  ghost: S.GhostButton,
};

const Button = (props: ButtonProps) => {
  const {
    type = "button",
    variant,
    icon,
    iconPostition,
    floating,
    disabled,
    onClick,
    children,
  } = props;

  const SelectedButton = buttonVariants[variant];

  return (
    <SelectedButton
      type={type}
      disabled={disabled}
      $iconPosition={iconPostition}
      $floating={floating}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} />}
      {children && <ButtonText>{children}</ButtonText>}
    </SelectedButton>
  );
};

export default Button;
