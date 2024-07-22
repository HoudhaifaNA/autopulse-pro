import styled from "styled-components";

export const DeleteButton = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5000000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export const DocumentPreview = styled.div`
  position: relative;
  grid-column: span 1;
  grid-row: span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &:hover ${DeleteButton} {
    visibility: visible;
    opacity: 1;
  }
`;
