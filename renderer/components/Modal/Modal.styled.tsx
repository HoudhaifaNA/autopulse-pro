import styled, { keyframes } from "styled-components";

const show = keyframes`
  0%{
    transform: translate(-50%, -52.5%) scale(0.9);
    
  }
  
  100%{
    transform: translate(-50%, -52.5%) scale(1);
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -52.5%) scale(0.9);
  z-index: 1000;
  min-width: 65rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
  animation: ${show} 0.15s ease forwards;
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
  max-height: 60rem;
  padding: 2rem;
`;

export const ModalActions = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  border-top: 0.1rem solid ${({ theme }) => theme.colors.neutral["300"]};
  border-bottom-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
`;
