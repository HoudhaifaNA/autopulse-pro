import { GhostButton } from "components/Button/Button.styled";
import styled from "styled-components";
import { Body2 } from "styles/Typography";

interface DropdwonHeaderProps {
  $isExpanded: boolean;
}

export const BrandsFilterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const DropdownWrapper = styled.div<DropdwonHeaderProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  svg {
    margin-left: 1rem;
    transform: ${({ $isExpanded }) => $isExpanded && "rotate(0.5turn)"};
    transition: all 0.4s;
  }

  ${GhostButton} {
    height: fit-content;
    padding: 0;
  }
`;

export const DropdownHeader = styled.div`
  position: relative;
  min-width: 22rem;
  height: 4rem;
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.1rem solid ${({ theme }) => theme.colors.neutral["500"]};
  border-radius: 0.4rem;
  cursor: pointer;

  ${Body2} {
    font-weight: 500;
  }

  ${Body2}:first-child {
    margin-right: auto;
  }
`;
