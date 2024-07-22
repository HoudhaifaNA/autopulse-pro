import styled from "styled-components";

interface FormGroupInterface {
  $disabled?: boolean;
  $height?: string;
}

export const FormGroup = styled.div<FormGroupInterface>`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  height: ${({ $height }) => ($height ? $height : "8.3rem")};
  width: 100%;
  opacity: ${({ $disabled }) => ($disabled ? ".5" : "1")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "")};

  label::first-letter {
    text-transform: capitalize;
  }

  &.dropdown-active svg {
    transform: rotate(0.5turn);
  }
`;

export const ClickInputContainer = styled.div`
  display: flex;
  height: 2rem;
  gap: 1rem;

  & > label {
    white-space: nowrap;
  }
`;

export const ClickInput = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  accent-color: ${({ theme }) => theme.colors.primary["500"]};
  border: none;
  outline: none;
  cursor: pointer;
`;

export const MultiSelectWrapper = styled.div<{ $hasError: boolean }>`
  width: 100%;
  height: 8.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  .mantine-MultiSelect {
    &-root {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      height: 6.2rem;
    }
    &-input {
      height: 4rem;
      font-size: 1.4rem;
      font-family: "Inter", sans-serif;
      display: flex;
      align-items: center;
    }

    &-defaultValue {
      text-transform: capitalize;
      font-size: 1.3rem;
    }

    &-item {
      height: 4rem;
      text-transform: capitalize;
      font-size: 1.4rem;
      font-family: "Inter", sans-serif;
      color: ${({ theme, $hasError }) => ($hasError ? theme.colors.error["700"] : theme.colors.black)};
    }
  }
`;

export const SelectInput = styled.div`
  position: relative;
  width: 100%;
`;

export const InputError = styled.p`
  color: ${({ theme }) => theme.colors.error["700"]};
  font-size: 1.2rem;
  font-weight: 500;

  &:first-letter {
    text-transform: capitalize;
  }
`;
