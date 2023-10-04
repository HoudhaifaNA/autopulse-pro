import styled from "styled-components";
import { Body2 } from "styles/Typography";

export const TableWrapper = styled.div`
  min-height: 70vh;
  max-height: 75vh;
  max-width: 100%;
  overflow: auto;
  padding-right: 0.2rem;
  padding-bottom: 0.2rem;
  background-color: ${({ theme }) => theme.colors.white};

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

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;

  .blurred {
    filter: blur(8px);
  }
`;

export const TableHead = styled.thead`
  width: 100%;
`;

export const TableHeaderCell = styled.th`
  position: sticky;
  top: 0px;
  z-index: 15;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.neutral[200]};
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral[900]};
  white-space: nowrap;
  padding: 0 1rem;
  cursor: pointer;
`;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableRow = styled.tr`
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 0.2rem solid;
  border-right: 0.2rem solid;
  border-left: 0.2rem solid;
  border-color: ${({ theme }) => theme.colors.neutral[200]};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
`;

export const TableCell = styled.td`
  position: relative;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  padding: 0 1rem;
  cursor: pointer;

  ${Body2} {
    font-weight: 500;
  }

  ${Body2}::first-letter {
    text-transform: capitalize;
  }

  a {
    color: ${({ theme }) => theme.colors.primary[900]};
    text-decoration: none;
    padding-bottom: 0.2rem;
    border-bottom: 0.1rem dashed ${({ theme }) => theme.colors.primary[900]};
  }
`;

export const TableCellFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;
