import styled from "styled-components";

export const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 14rem;
`;

export const FormHeading = styled.div`
  text-align: center;
  margin-bottom: 3.5rem;

  img {
    margin-bottom: 1rem;
  }
`;

export const Form = styled.form`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
