import styled from "styled-components";

export const TableWrapper = styled.div`
  height: 40rem;
  margin-top: 8rem;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 1.5rem 2rem;
  height: 5.4rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TableHeader = styled(TableRow)`
  background-color: ${({ theme }) => theme.colors.primary["50"]};
`;

export const TableCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 14rem;

  &:first-child {
    width: 1.6rem;
  }
`;
