import styled from "styled-components";

import { GhostButton } from "components/Button/Button.styled";

export const AmountRangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${GhostButton} {
    height: fit-content;
    padding: 0;
  }
`;

export const RangeInputList = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const RangeInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  white-space: nowrap;
`;

export const RangeInput = styled.input`
  padding: 1rem;
  max-width: 18rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.neutral["500"]};
  border-radius: 0.4rem;

  &:focus {
    outline: 0.1rem solid ${({ theme }) => theme.colors.primary["500"]};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
