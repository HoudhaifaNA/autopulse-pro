import styled from "styled-components";

export const Form = styled.form`
  width: 78rem;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-right: 1rem;
  max-height: 50rem;
`;

export const FormGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
`;

export const ScrollFormWrapper = styled.div`
  min-height: 40rem;
  max-height: 50rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-right: 1rem;
`;
