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
  /* overflow: auto;

  ::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #b3b3b3;
    border-radius: 0.5rem;
  } */
`;

export const FormGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
`;
