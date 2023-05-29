import styled from "styled-components";

export const TransactionsTable = styled.div``;

export const TransactionRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(max-content, 1fr));
  column-gap: 1.5rem;
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.neutral[50]};

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
  }
`;

export const TransactionCell = styled.div`
  display: flex;
  align-items: center;
`;
