import styled from "styled-components";

export const TableWrapper = styled.div`
  height: 40rem;
  margin-top: 8rem;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  height: 5.4rem;

  & > div:last-child,
  & > :first-child {
    width: 1.6rem;
  }
  & > div:last-child {
    margin-left: auto;
  }
`;

export const TableHeader = styled(TableRow)`
  background-color: ${({ theme }) => theme.colors.primary["50"]};
`;

export const TableItem = styled(TableRow)`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TableContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 16rem;
`;
