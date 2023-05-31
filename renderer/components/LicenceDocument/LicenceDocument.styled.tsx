import styled from "styled-components";

export const LicenceAttachments = styled.div`
  grid-column: span 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 1rem;
`;

export const AttachmentController = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: none;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  div {
    padding: 0.6rem;
  }

  & svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;
export const Attachement = styled.div`
  position: relative;
  height: 18rem;
  width: 12rem;
  border-radius: 0.4rem;
  overflow: hidden;
  cursor: pointer;

  &:hover ${AttachmentController} {
    display: flex;
  }
`;
