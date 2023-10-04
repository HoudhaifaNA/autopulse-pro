import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 120.5rem;
  flex: 1;
`;

export const CurrentPage = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral["50"]};
  flex: 1 1 auto;
  height: 0;
  min-height: 70vh;
  padding: 2rem 3.2rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }
`;
