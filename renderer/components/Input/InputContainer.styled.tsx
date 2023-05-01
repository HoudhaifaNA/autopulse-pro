import styled from "styled-components";

import { SearchBarContainer } from "components/Header/Header.styled";

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  min-height: 4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.neutral["500"]};
  border-radius: 0.4rem;
  overflow: hidden;

  &:focus-within {
    border: 0.1rem solid ${({ theme }) => theme.colors.primary["500"]};
  }

  &.error {
    color: ${({ theme }) => theme.colors.error["700"]};
    border: 0.1rem solid ${({ theme }) => theme.colors.error["700"]};
  }

  &.error svg {
    fill: ${({ theme }) => theme.colors.error["700"]};
  }

  ${SearchBarContainer} &:focus-within {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const InputAddOn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 5rem;
  background-color: ${({ theme }) => theme.colors.neutral["200"]};

  p {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0.8rem;
  padding: 0 1rem;

  svg {
    fill: ${({ theme }) => theme.colors.neutral["500"]};
  }
  svg:last-child {
    cursor: pointer;
  }
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  flex: 1;
  color: inherit;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6rem;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral["500"]};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
