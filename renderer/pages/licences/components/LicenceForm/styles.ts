import styled from "styled-components";

export const DocumentsList = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 10rem;
  grid-gap: 2rem;
  width: 100%;
  max-height: 30rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }
`;
