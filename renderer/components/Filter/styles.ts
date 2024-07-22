import styled from "styled-components";

export const FilterWrapper = styled.div`
  position: relative;

  & > button {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const FilterCard = styled.div`
  position: absolute;
  top: 4rem;
  z-index: 2500;
  width: 44rem;
  min-height: 35rem;
  max-height: 50rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.4rem;
  overflow-y: auto;
`;
