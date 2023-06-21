import styled, { keyframes } from "styled-components";

const slidIn = keyframes`
  0%{
    right: -100%;
  }

  100%{
    right: 0rem;
  }
`;

export const DetailsViewer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 80000;
`;

export const DetailsContainer = styled.div<{ $width: string }>`
  position: absolute;
  right: -100%;
  top: 0;
  z-index: 80000;
  width: ${({ $width }) => $width};
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  background-color: ${({ theme }) => theme.colors.neutral[50]};
  overflow-x: hidden;
  overflow-y: scroll;
  animation: ${slidIn} ease-in-out 1.4s forwards;

  ::-webkit-scrollbar {
    width: 0.7rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
  }
`;

export const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
`;

export const DetailSectionHeader = styled.div`
  padding: 0.5rem 1.5rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.neutral[300]};
`;

export const DetailContent = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) =>
    `repeat(${$columns}, minmax(max-content, 1fr))`};
  column-gap: 2rem;
  row-gap: 2.5rem;
  padding: 1.5rem;
`;

export const DetailItem = styled.div<{ $index?: number; $width?: string }>`
  grid-row-start: ${({ $index }) => $index && $index + 1};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: ${({ $width }) => ($width ? $width : "auto")};
  & p::first-letter {
    text-transform: capitalize;
  }

  & p:first-child {
    color: ${({ theme }) => theme.colors.neutral[700]};
  }
  & p.red {
    color: ${({ theme }) => theme.colors.error[700]};
  }
  & p.green {
    color: ${({ theme }) => theme.colors.success[700]};
  }
`;
