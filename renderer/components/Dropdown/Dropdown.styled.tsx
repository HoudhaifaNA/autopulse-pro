import styled from "styled-components";
import { GhostButton } from "components/Buttons/Button.styled";

export const DropdownWrapper = styled.div`
  max-height: 24rem;
  min-width: fit-content;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  border-radius: 0.4rem;
  margin-bottom: 1.5rem;
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
  height: 4rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral["50"]};
  }
`;

export const MainTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ButtonItem = styled.div<{ $ghostColor?: string }>`
  ${GhostButton} {
    justify-content: flex-start;
    padding: 0.8rem 1rem;
    width: 100%;
    color: ${({ $ghostColor }) => $ghostColor};
    border-radius: 0;

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral["50"]};
      transform: none;
    }
  }
`;
