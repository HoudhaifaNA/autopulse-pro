import { ButtonText } from "styles/Typography";
import { GhostButton, PrimaryButton, SecondaryButton } from "./ButtonStyle";

const buttonVariants = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  ghost: GhostButton,
};

interface IconT {
  src: string;
  position: "right" | "left";
}

interface ButtonProps {
  variant: "primary" | "secondary" | "ghost";
  icon?: IconT;
  floating?: boolean;
  disabled?: boolean;
  children: string;
}

const Button = ({
  variant,
  icon,
  floating,
  disabled,
  children,
}: ButtonProps) => {
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
