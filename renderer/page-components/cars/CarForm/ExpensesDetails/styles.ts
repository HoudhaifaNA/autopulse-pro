import styled from "styled-components";

export const ExpensesWrapper = styled.div`
  position: relative;
  min-height: 20rem;
  max-height: 50rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-right: 1rem;
`;

export const ExpensesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
