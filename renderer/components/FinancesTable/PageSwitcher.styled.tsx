import styled from "styled-components";

export const PageSwitcher = styled.div`
  display: flex;
  align-items: center;
`;

export const PageItem = styled.div<{ $active: boolean }>`
  padding: 1rem 1.5rem;
  border-bottom: 0.4rem solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary["500"] : "transparent"};
  cursor: pointer;

  & p::first-letter {
    text-transform: uppercase;
  }
`;
