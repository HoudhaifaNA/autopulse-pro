import { GhostButton, PrimaryButton, SecondaryButton } from "./ButtonStyle";
import { ButtonText } from "styles/Typography";
import Icon from "components/Icon/Icon";

interface IconType {
  name: string;
  position: "right" | "left";
}

interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  icon?: IconType;
  floating?: boolean;
  disabled?: boolean;
  children?: string;
}

const buttonVariants = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  ghost: GhostButton,
};

const Button = (props: ButtonProps) => {
  const { variant, icon, floating, disabled, children } = props;
  const SelectedButton = buttonVariants[variant];

  return (
    <SelectedButton
      $icon={icon?.position}
      $floating={floating}
      disabled={disabled}
    >
      {icon && <Icon icon={icon.name} />}
      {children && <ButtonText>{children}</ButtonText>}
    </SelectedButton>
  );
};

export default Button;
