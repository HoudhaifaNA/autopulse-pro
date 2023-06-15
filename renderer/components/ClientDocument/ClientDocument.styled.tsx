import styled from "styled-components";

export const TransactionsTable = styled.div``;

export const TransactionRow = styled.div`
  display: grid;
  grid-template-columns: 10rem 24rem 14rem 10rem 10rem 1fr 8rem;
  column-gap: 1rem;
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.neutral[50]};

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
  }
`;

export const TransactionCell = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;

  & p::first-letter {
    text-transform: capitalize;
  }
`;
