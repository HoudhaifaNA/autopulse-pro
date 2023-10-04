import styled, { keyframes } from "styled-components";

interface ModalWrapperProps {
  $zIndexMultiplier: number;
}

const show = keyframes`
  0%{
    transform: translate(-50%, -52.5%) scale(0.9);
    
  }
  
  100%{
    transform: translate(-50%, -52.5%) scale(1);
  }
`;

const reShow = keyframes`
  0%{
    transform: translate(-50%, -52.5%) scale(0.99);
    
  }
  
  100%{
    transform: translate(-50%, -52.5%) scale(1);
  }
`;

export const ModalWrapper = styled.div<ModalWrapperProps>`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -52.5%) scale(0.9);
  z-index: ${({ $zIndexMultiplier }) => 5000 * $zIndexMultiplier};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
  animation: ${show} 0.15s ease forwards;

  &.signal {
    animation: ${reShow} 0.15s ease forwards;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem 2rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.neutral["300"]};
  cursor: grab;
`;

export const CloseModalButton = styled.div`
  padding: 0.5rem;
  border-radius: 10rem;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral[200]};
  }

  svg {
    fill: ${({ theme }) => theme.colors.neutral["700"]};
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  min-width: 60rem;
  max-height: 60rem;
  padding: 2rem;
  padding-bottom: 10rem;
`;

export const ModalActions = styled.div`
  position: absolute;
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
