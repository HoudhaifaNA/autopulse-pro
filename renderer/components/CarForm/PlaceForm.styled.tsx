import styled from "styled-components";

export const PlaceFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7rem;
  height: 20rem;
`;
export const PlaceItem = styled.div<{ $selected: boolean }>`
  position: relative;
  width: 19rem;
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-transform: capitalize;
  border: 0.2rem solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.primary[500] : theme.colors.neutral[300]};
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
