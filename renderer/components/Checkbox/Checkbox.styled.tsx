import styled from "styled-components";

interface CheckboxProps {
  $checked: boolean;
}

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Checkbox = styled.div<CheckboxProps>`
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  background-color: ${({ $checked, theme }) => ($checked ? theme.colors.primary["500"] : theme.colors.white)};
  border: 0.2rem solid
    ${({ $checked, theme }) => ($checked ? theme.colors.primary["500"] : theme.colors.neutral["500"])};
  cursor: pointer;
  outline: none;

  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;
