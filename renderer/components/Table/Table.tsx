import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  margin-top: 5rem;
  border-collapse: collapse;
  overflow: hidden;
`;

export const TableRow = styled.tr<{ $header?: boolean }>`
  height: 5rem;
  background-color: ${({ $header, theme }) =>
    $header ? theme.colors.primary[50] : "#fff"};
  padding: 1.5rem 2rem;
`;

export const TableCol = styled.td`
  padding: 1rem;
  div {
    display: flex;
    align-items: center;
  }

  p {
    white-space: nowrap;
  }
`;
