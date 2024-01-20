import styled from "styled-components";

export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 100%;
`;

export const TextAreaInput = styled.textarea`
  font-family: "Inter", sans-serif;
  width: 100%;
  height: 10rem;
  min-width: 100%;
  max-width: 100%;
  min-height: 10rem;
  max-height: 40rem;
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem;
  outline: none;
`;
