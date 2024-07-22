import styled, { keyframes } from "styled-components";

const spinning = keyframes`
    0%{
        transform: rotate(0);
    }

    100%{
        transform: rotate(360deg);
    }
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;

export const LoadingSpinner = styled.div`
  padding: 2rem;
  border: 0.8rem solid ${({ theme }) => theme.colors.primary["50"]};
  border-right-color: ${({ theme }) => theme.colors.primary["300"]};
  border-bottom-color: ${({ theme }) => theme.colors.primary["500"]};
  border-left-color: ${({ theme }) => theme.colors.primary["700"]};
  border-radius: 50%;
  animation: ${spinning} 1s linear infinite;
`;
