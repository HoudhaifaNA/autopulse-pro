import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 3rem;
  height: 70rem;
  padding: 2rem 0;
`;

export const ProfilePicture = styled.div`
  min-width: 15rem;
  width: 15rem;
  height: 15rem;
  background-color: #088993;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  word-break: break-all;
  border-radius: 50%;
  & h3::first-letter {
    text-transform: uppercase;
  }
`;

export const MainWrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CurrentPage = styled.div`
  padding: 3rem 6rem;
`;
