import styled from "styled-components";

interface ToggleProps {
  $label?: "left" | "right";
  disabled?: boolean;
}

interface SwitchProps {
  $toggle: boolean;
}

export const ToggleContainer = styled.div<ToggleProps>`
  display: flex;
  align-items: center;
  flex-direction: ${({ $label }) => ($label === "right" ? "row-reverse" : "")};
  width: fit-content;
  gap: 1rem;
  opacity: ${({ disabled }) => (disabled ? ".6" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "disabled" : "")};
  cursor: default;
`;

export const SwitchWrapper = styled.div<SwitchProps>`
  position: relative;
  height: 2.5rem;
  width: 5rem;
  background-color: ${({ theme, $toggle }) =>
    $toggle ? theme.colors.primary["500"] : theme.colors.neutral["300"]};
  border-radius: 10rem;
  transition: all 0.2s linear;
  cursor: pointer;
`;

export const SwitchCircle = styled.div<SwitchProps>`
  position: absolute;
  left: ${({ $toggle }) => ($toggle ? "2.9rem" : ".4rem")};
  top: 50%;
  transform: translateY(-50%);
  width: 1.7rem;
  height: 1.7rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10rem;
  transition: left 0.2s linear;
`;
