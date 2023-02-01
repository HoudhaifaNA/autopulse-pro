import styled from "styled-components";

export const TableWrapper = styled.div`
  height: 40rem;
  margin-top: 8rem;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
`;

export const TableHeader = styled(TableRow)`
  background-color: ${({ theme }) => theme.colors.primary["50"]};
`;

export const TableItem = styled(TableRow)`
  background-color: ${({ theme }) => theme.colors.white};
  height: 5.4rem;
`;

export const TableContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
