import styled, { keyframes } from "styled-components";

import { GhostButton } from "components/Button/Button.styled";
import { TableWrapper } from "components/Table/styles";

interface DetailContentStyleProps {
  $columns: number;
}

interface DetailItemStyleProps {
  $index?: number;
  $width?: string;
}

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
  z-index: 3500;

  ${TableWrapper} {
    min-height: auto;
  }

  .blurred {
    filter: blur(8px);
  }
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

  ${GhostButton} {
    padding: 0;
  }

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.neutral[300]};

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary[900]};
    text-decoration: none;
    padding-bottom: 0.2rem;
    width: max-content;
    border-bottom: 0.1rem dashed ${({ theme }) => theme.colors.primary[900]};
  }
  & h5::first-letter {
    text-transform: capitalize;
  }
  a > * {
    cursor: pointer;
  }
`;

export const DetailContent = styled.div<DetailContentStyleProps>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, minmax(max-content, 1fr))`};
  column-gap: 2rem;
  row-gap: 2.5rem;
  padding: 1.5rem;
`;

export const DetailItem = styled.div<DetailItemStyleProps>`
  grid-row-start: ${({ $index }) => $index && $index + 1};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: ${({ $width }) => ($width ? $width : "auto")};

  a {
    color: ${({ theme }) => theme.colors.primary[900]};
    text-decoration: none;
    padding-bottom: 0.2rem;
    width: max-content;
    border-bottom: 0.1rem dashed ${({ theme }) => theme.colors.primary[900]};
  }
  a > * {
    cursor: pointer;
  }

  & p::first-letter,
  & label::first-letter {
    text-transform: capitalize;
  }

  & p:first-child {
    color: ${({ theme }) => theme.colors.neutral[700]};
  }

  a {
    color: ${({ theme }) => theme.colors.primary[900]};
    text-decoration: none;
    padding-bottom: 0.2rem;
    width: max-content;
    border-bottom: 0.1rem dashed ${({ theme }) => theme.colors.primary[900]};
  }
`;

export const AttachmentsList = styled.div`
  grid-column: span 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 3rem;
`;

export const AttachementThumbnail = styled.div`
  position: relative;
  height: 18rem;
  width: 12rem;
  border-radius: 0.4rem;
  overflow: hidden;
  cursor: pointer;
`;
