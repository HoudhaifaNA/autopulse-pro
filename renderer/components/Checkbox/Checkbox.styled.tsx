import styled from "styled-components";

interface CheckboxProps {
  $checked: boolean;
}

export const CheckboxWrapper = styled.div<CheckboxProps>`
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary["500"] : "#fff"};
  border: 0.2rem solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.primary["500"] : theme.colors.neutral["500"]};
  cursor: pointer;

  svg {
    fill: #fff;
  }
`;
