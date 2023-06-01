import styled from "styled-components";

export const ExpensesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 20rem;
  max-height: 50rem;
  padding-right: 1rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
  }
`;

export const ExpenseAdder = styled.div`
  width: fit-content;

  & > button {
    padding: 0;
  }
`;
