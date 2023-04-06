import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 5rem;
  height: 60rem;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  height: 5rem;
  padding: 1.5rem 2rem;
  background-color: ${({ theme }) => theme.colors.white};

  :nth-child(even) {
    background-color: ${({ theme }) => theme.colors.neutral[300]};
  }

  th,
  td {
    padding: 1rem;

    & > div {
      display: flex;
      align-items: center;
    }

    p {
      white-space: nowrap;
    }
  }
`;
export const TableHeaderCell = styled.th`
  background-color: ${({ theme }) => theme.colors.primary[50]};
  position: sticky;
  top: 0px;
`;
export const TableCell = styled.td``;

export const TableRowActions = styled.div`
  position: relative;

  & > div {
    position: absolute;
    right: 0;
    top: -1rem;
    z-index: 5000;
  }
`;
