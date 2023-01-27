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
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  children?: string;
}

const buttonVariants = {
  primary: S.PrimaryButton,
  secondary: S.SecondaryButton,
  ghost: S.GhostButton,
};

const Button = (props: ButtonProps) => {
  // ...allProps will equalt to type and disabled and onClick.
  // we can show them with the element in the browser so we don't use $. ex: type={type}

  const { variant, icon, iconPostition, floating, children, ...allProps } =
    props;

  const SelectedButton = buttonVariants[variant];

  return (
    <SelectedButton
      $iconPosition={iconPostition}
      $floating={floating}
      {...allProps}
    >
      {icon && <Icon icon={icon} iconSize="2rem" />}
      {children && <ButtonText>{children}</ButtonText>}
    </SelectedButton>
  );
};

export default Button;
