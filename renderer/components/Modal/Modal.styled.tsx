import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -52.5%);
  z-index: 1000;
  min-width: 65rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.neutral["300"]};

  & > svg {
    fill: ${({ theme }) => theme.colors.neutral["700"]};
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  max-height: 55rem;
  padding: 2rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const ModalActions = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  border-top: 0.1rem solid ${({ theme }) => theme.colors.neutral["300"]};
`;
