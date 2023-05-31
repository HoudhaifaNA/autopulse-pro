import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & .form_toggle {
    color: ${({ theme }) => theme.colors.primary[700]};
    cursor: pointer;
  }
`;
