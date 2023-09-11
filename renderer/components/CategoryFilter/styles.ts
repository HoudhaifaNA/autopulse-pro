import styled from "styled-components";

interface CategoryFilterOptionProps {
  $isSelected: boolean;
}

export const CategoryFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const CategoryFilterList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  /* border: 0.2rem solid ${({ theme }) => theme.colors.primary[500]}; */
`;

export const CategoryFilterOption = styled.div<CategoryFilterOptionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  height: 100%;
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.white : theme.colors.primary[500])};
  background-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.primary[500] : theme.colors.white)};
  border: 0.2rem solid ${({ theme }) => theme.colors.primary[500]};
  border-right: none;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:last-child {
    border-right: 0.2rem solid ${({ theme }) => theme.colors.primary[500]};
  }
`;
