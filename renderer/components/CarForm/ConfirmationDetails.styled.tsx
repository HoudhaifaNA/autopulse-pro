import styled from "styled-components";

export const ConfirmationWrapper = styled.div`
  max-height: 50rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SectionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
