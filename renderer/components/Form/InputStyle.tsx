"use client";

import styled from "styled-components";

export const FormGroup = styled.div`
  width: 25.4rem;
  // ! TO BE REMOVED
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
export const InputStyle = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0.8rem 1rem;
  gap: 0.8rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6rem;
  outline: none;
  border: 0.1rem solid ${({ theme }) => theme.colors.neutral["500"]};
  border-radius: 0.4rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral["500"]};
  }
`;
