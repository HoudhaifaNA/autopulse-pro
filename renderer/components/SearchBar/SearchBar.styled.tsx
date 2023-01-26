import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  height: 7rem;
  padding: 1rem 3.2rem;
`;

export const SearchBarContainer = styled.div`
  position: relative;
  flex-basis: 52.5rem;
`;

export const SearchList = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.neutral["500"]};
  border-top: none;
  border-radius: 0 0 0.4rem 0.4rem;
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.15);
`;

export const SearchCategory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  span {
    font-size: 1.2rem;
    text-transform: capitalize;
  }
`;

export const CategoryItem = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.4rem 0;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black};
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    fill: currentColor;
  }

  p {
    text-transform: capitalize;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral["50"]};
  }
`;

export const UserOverview = styled.div`
  background-color: red;
  height: 4rem;
  flex-basis: 4rem;
`;
