import styled from "styled-components";

interface CarTypeProps {
  $selected: boolean;
}

export const CarTypeWrapper = styled.div`
  display: grid;
  min-height: 30rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 5rem;
  overflow-y: auto;
  padding: 2rem;
  height: 20rem;
`;
export const CarType = styled.div<CarTypeProps>`
  position: relative;
  grid-column: span 1;
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-transform: capitalize;
  border: 0.2rem solid ${({ $selected, theme }) => ($selected ? theme.colors.primary[500] : theme.colors.neutral[300])};
  border-radius: 0.4rem;
  user-select: none;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: -1rem;
  top: -1rem;
  background-color: ${({ theme }) => theme.colors.white};
  height: 2.4rem;
  svg {
    fill: ${({ theme }) => theme.colors.primary[500]};
  }
`;
