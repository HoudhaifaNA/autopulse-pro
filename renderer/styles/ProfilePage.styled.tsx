import styled from "styled-components";

export const ProfileWrapper = styled.div`
  display: flex;
  gap: 15rem;
  height: 20rem;
  padding: 2rem 0;
`;

export const ProfilePicture = styled.div`
  width: 15rem;
  height: 15rem;
  background-color: #872a27;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  word-break: break-all;
  border-radius: 50%;
`;
