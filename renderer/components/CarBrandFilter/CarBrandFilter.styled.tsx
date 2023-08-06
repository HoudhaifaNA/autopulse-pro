import styled from "styled-components";

export const FilterWrapper = styled.div`
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 4rem;
`;

export const FilterField = styled.div`
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

  svg {
    margin-left: 1rem;
    transition: all 0.4s;
  }

  &.dropdown_active {
    div:last-child {
      svg {
        transform: rotate(0.5turn);
      }
    }
  }
`;
