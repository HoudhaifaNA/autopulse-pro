import styled from "styled-components";

import { GhostButton } from "components/Button/Button.styled";
import { SDropdownProps } from "components/Dropdown/types";

export const DropdownWrapper = styled.div<SDropdownProps>`
  position: absolute;
  top: ${({ $top }) => ($top ? $top : "")};
  bottom: ${({ $bottom }) => ($bottom ? $bottom : "")};
  left: ${({ $left }) => ($left ? $left : "")};
  right: ${({ $right }) => ($right ? $right : "")};
  width: ${({ $width }) => ($width ? $width : "")};
  z-index: 3000;
`;

export const Dropdown = styled.div<SDropdownProps>`
  position: relative;
  max-height: 24rem;
  min-width: fit-content;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  border-radius: 0.4rem;

  ${GhostButton} {
    justify-content: flex-start;
    padding: 0.8rem 1rem !important;
    width: 100%;
    color: ${({ theme }) => theme.colors.neutral["700"]};
    border-radius: 0;

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral["50"]};
      color: ${({ theme }) => theme.colors.black};
      transform: none;
    }
  }
`;

export const DropdownList = styled.ul`
  list-style: none;
  width: 100%;
  max-height: 20rem;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  height: 4rem;
  cursor: pointer;
  font-variant-numeric: tabular-nums;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral["50"]};
  }
`;

export const MainTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  & p::first-letter {
    text-transform: uppercase;
  }
`;
