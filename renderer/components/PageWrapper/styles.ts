import styled from "styled-components";

export const PageHeaderAddOn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 0;
`;

export const FilterList = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.primary[50]};
  padding: 0.8rem 1.4rem;
  border-radius: 0.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;

  svg {
    background-color: ${({ theme }) => theme.colors.neutral[50]};
  }
`;
