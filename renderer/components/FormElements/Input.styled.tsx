"use client";

import styled from "styled-components";

interface FormGroupInterface {
  $direction: "row" | "column";
  disabled?: boolean;
}

export const FormGroup = styled.div<FormGroupInterface>`
  margin-top: 2rem;
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $direction }) =>
    $direction === "row" ? "center" : "flex-start"};
  gap: 0.6rem;
  opacity: ${({ disabled }) => (disabled ? ".5" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "")};
  p {
    color: red !important;
  }
`;

export const InputContainer = styled.div<{ $error: boolean }>`
  display: flex;
  width: 100%;
  height: 4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.neutral["500"]};
  border-radius: 0.4rem;
  overflow: hidden;
  &:focus-within {
    border: 0.1rem solid
      ${({ theme, $error }) =>
        $error ? theme.colors.error["700"] : theme.colors.primary["500"]};
  }
`;

export const InputAddOn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 5rem;
  background-color: ${({ theme }) => theme.colors.neutral["300"]};
  color: ${({ theme }) => theme.colors.black};
`;

export const InputWrapper = styled.div<{ $error: boolean }>`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  color: ${({ theme, $error }) =>
    $error ? theme.colors.error["700"] : theme.colors.black};

  svg {
    width: 1.8rem;
    height: 1.8rem;
    fill: currentColor;
  }
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6rem;
  outline: none;
  color: inherit;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral["500"]};
  }
`;

export const Checkbox = styled.input`
  width: 2rem;
  height: 2rem;
  accent-color: ${({ theme }) => theme.colors.primary["500"]};
  cursor: pointer;
`;
