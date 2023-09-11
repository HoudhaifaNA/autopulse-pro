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

  ::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #b3b3b3;
    border-radius: 0.5rem;
  }
`;

export const ExpensesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
