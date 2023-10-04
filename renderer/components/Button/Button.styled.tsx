import styled, { keyframes } from "styled-components";

interface StyledButtonProps {
  $iconPosition?: "right" | "left";
  $floating?: boolean;
  $width?: string;
  disabled?: boolean;
}

const setButtonWidth = ({ $floating, $width }: StyledButtonProps) => {
  if ($floating) return "4rem";
  if ($width) return $width;
  return "fit-content";
};

const spinner = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);

  }

`;

const Button = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ $iconPosition }) => ($iconPosition === "right" ? "row-reverse" : "row")};
  gap: 0.8rem;
  height: 4rem;
  width: ${(props) => setButtonWidth(props)};
  padding: ${({ $floating }) => ($floating ? "" : "1rem 1.8rem")};
  outline: none;
  border: 0.1rem solid ${({ theme }) => theme.colors.primary["500"]};
  border-radius: 0.4rem;
  transition: all 0.1s ease-in;
  opacity: ${({ disabled }) => (disabled ? ".6" : "1")};
  cursor: pointer;
  user-select: none;
  // Make transition if not disabled
  &:active {
    &:not([disabled]) {
      transform: translateY(0.05rem);
    }
  }
`;

export const PrimaryButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary["500"]};

  // Change background color if not disabled
  &:hover,
  &:active {
    &:not([disabled]) {
      background-color: ${({ theme }) => theme.colors.primary["700"]};
    }
  }
`;

export const SecondaryButton = styled(Button)`
  color: ${({ theme }) => theme.colors.primary["500"]};
`;

export const GhostButton = styled(Button)`
  color: ${({ theme }) => theme.colors.primary["500"]};
  background-color: transparent;
  border: none;
`;
export const DangerButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.error["500"]};
  border-color: ${({ theme }) => theme.colors.error["500"]};

  &:hover,
  &:active {
    &:not([disabled]) {
      background-color: ${({ theme }) => theme.colors.error["700"]};
    }
  }
`;

export const Loader = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  border: 0.2rem solid currentColor;
  border-top-color: transparent;
  border-radius: 10rem;
  animation: ${spinner} 1s linear infinite;
`;
