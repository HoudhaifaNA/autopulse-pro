import styled from "styled-components";

import { GhostButton } from "components/Button/Button.styled";

export const ExpenseAdder = styled.div`
  & > ${GhostButton} {
    padding: 0;
  }
`;
