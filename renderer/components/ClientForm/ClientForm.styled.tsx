import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 65rem;
  gap: 4rem;
  margin: 2rem 0;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4rem;

  & > div {
    flex: 1;
  }
`;
