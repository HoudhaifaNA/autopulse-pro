import styled from "styled-components";

import { SecondaryButton } from "components/Button/Button.styled";

export const ExpandWrapper = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  justify-content: center;

  ${SecondaryButton} {
    background-color: ${({ theme }) => theme.colors.white};
  }

  svg {
    transform: ${({ $isExpanded }) => ($isExpanded ? "rotate(.5turn)" : "")};
  }
`;
