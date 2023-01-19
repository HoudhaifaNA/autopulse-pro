"use client";
import styled from "styled-components";

/**@ts-ignore */
const isDisabled = (props) => {
  const { theme, disabled } = props;
  return disabled ? theme.colors.neutral["500"] : theme.colors.primary["500"];
};

interface RProp {
  icon?: "right" | "left";
}

const Button = styled.button<RProp>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ icon }) => (icon === "right" ? "row-reverse" : "row")};
  gap: 0.8rem;
  height: 4rem;
  padding: 1rem 2rem;
  outline: none;
  border: 0.1rem solid ${isDisabled};
  border-radius: 0.4rem;
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    fill: currentColor;
  }

  // !TO REMOVE
  &:active {
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${isDisabled};
  color: ${({ theme }) => theme.colors.white};

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
