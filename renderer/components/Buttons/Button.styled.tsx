import styled from "styled-components";

interface StyledButtonProps {
  $iconPosition?: "right" | "left";
  $floating?: boolean;
}

/**@ts-ignore */
const isDisabled = (props) => {
  const { theme, disabled } = props;
  return disabled ? theme.colors.neutral["500"] : theme.colors.primary["500"];
};

const Button = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ $iconPosition }) =>
    $iconPosition === "right" ? "row-reverse" : "row"};
  gap: 0.8rem;
  height: 4rem;
  width: ${({ $floating }) => ($floating ? "4rem" : "100%")};
  padding: ${({ $floating }) => ($floating ? "" : "1rem 1.8rem")};
  outline: none;
  border: 0.1rem solid ${isDisabled};
  border-radius: 0.4rem;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  // Make transition if not disabled
  &:active {
    &:not([disabled]) {
      transform: translateY(0.05rem);
    }
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${isDisabled};
  color: ${({ theme }) => theme.colors.white};

  // Change background color if not disabled
  &:hover,
  &:active {
    &:not([disabled]) {
      background-color: ${({ theme }) => theme.colors.primary["700"]};
    }
  }
`;

export const SecondaryButton = styled(Button)`
  color: ${isDisabled};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const GhostButton = styled(Button)`
  color: ${isDisabled};
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
`;
