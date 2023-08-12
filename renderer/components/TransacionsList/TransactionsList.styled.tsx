import styled from "styled-components";
export const TransactionsTable = styled.table`
  border-collapse: collapse;
`;
export const TransactionRow = styled.tr`
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
  }
  page-break-inside: avoid;
`;
export const TransactionCell = styled.td`
  padding: 1rem;
  align-items: center;
  cursor: pointer;
  & p {
    white-space: nowrap;
  }
  & p::first-letter {
    text-transform: capitalize;
  }
`;
