import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  height: 7rem;
  padding: 1rem 3.2rem;
`;

export const SearchBarContainer = styled.div`
  position: relative;
  flex-basis: 65rem;
`;

export const SearchList = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  z-index: 2500;
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
  max-height: 40rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
  }
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
    cursor: pointer;
  }

  p {
    text-transform: capitalize;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral["50"]};
  }
`;

export const UserOverview = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 2rem;
    text-decoration: none;
  }

  p {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const UserPicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 10rem;
  background-color: ${({ theme }) => theme.colors.warning["700"]};
`;
