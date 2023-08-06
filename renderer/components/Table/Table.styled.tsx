import styled from "styled-components";

export const TableWrapper = styled.div`
  min-height: 60rem;
  max-height: 75rem;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
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
    background-color: ${({ theme }) => theme.colors.neutral[200]};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.success[200]};
  }

  th,
  td {
    padding: 1rem;
    cursor: pointer;

    & > div {
      display: flex;
      align-items: center;
      position: relative;
    }

    p {
      white-space: nowrap;
    }
    p::first-letter {
      text-transform: capitalize;
    }
  }

  td {
    p {
      font-size: 1.5rem;
      font-weight: 500;
      color: #00009b;
    }
  }
`;
export const TableHeaderCell = styled.th`
  background-color: ${({ theme }) => theme.colors.primary[50]};
  position: sticky;
  top: 0px;
  z-index: 15;
`;
export const TableCell = styled.td<{ $blurred?: boolean }>`
  &.blurred {
    filter: blur(0.6rem);
  }
`;
