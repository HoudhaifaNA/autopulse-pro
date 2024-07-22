import styled from "styled-components";

export const ErrorMessageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.error["500"]};
`;
