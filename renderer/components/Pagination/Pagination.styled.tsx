import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4rem;
`;

export const PaginationRowsOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const RowsNumberController = styled.div`
  position: relative;
  width: 5rem;
`;

export const CurrentRowsNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.neutral[500]};
  border-radius: 0.5rem;
  cursor: pointer;
`;
export const RowsNumberDropwdown = styled.div`
  position: absolute;
  width: 100%;
`;

export const PaginationBrowser = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    cursor: pointer;
  }
`;
