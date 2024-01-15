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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 4rem;
  gap: 0.2rem;
  max-width: 100%;
`;

export const CategoryFilterOption = styled.div<CategoryFilterOptionProps>`
  grid-column: span 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  min-height: 4rem;
  padding: 0 0.5rem;
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.white : theme.colors.primary[500])};
  background-color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.primary[500] : theme.colors.white)};
  border: 0.2rem solid ${({ theme }) => theme.colors.primary[300]};
  border-radius: 0.4rem;
  transition: all 0.2s ease-in;
  cursor: pointer;
`;
