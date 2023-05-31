import styled from "styled-components";

export const PDFViewerWrapper = styled.div``;

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.black};
`;

export const JumpingInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 3rem;

  & > input {
    height: 100%;
    width: 5rem;
    padding: 0 1rem;
    border: 0.1rem solid ${({ theme }) => theme.colors.neutral[700]};
    border-radius: 0.1rem;
    outline: none;
  }

  & > input::-webkit-outer-spin-button,
  & > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
