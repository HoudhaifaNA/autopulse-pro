import { ButtonText } from "styles/Typography";
import { GhostButton, PrimaryButton, SecondaryButton } from "./ButtonStyle";

interface IconType {
  src: string;
  position: "right" | "left";
}

interface ButtonProps {
  children: string;
  variant: "primary" | "secondary" | "ghost";
  icon?: IconType;
  floating?: boolean;
  disabled?: boolean;
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
      icon={icon?.position}
      floating={floating}
      disabled={disabled}
    >
      <ButtonText>{children}</ButtonText>
    </SelectedButton>
  );
};

export default Button;
