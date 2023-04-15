import styled from "styled-components";

interface FormGroupInterface {
  $disabled?: boolean;
}

export const FormGroup = styled.div<FormGroupInterface>`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  height: 8.3rem;
  width: 100%;
  opacity: ${({ $disabled }) => ($disabled ? ".5" : "1")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "")};
`;

export const ClickInputContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ClickInput = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  accent-color: ${({ theme }) => theme.colors.primary["500"]};
  border: none;
  cursor: pointer;
`;

export const InputError = styled.p`
  color: ${({ theme }) => theme.colors.error["700"]};
  font-size: 1.2rem;
  font-weight: 500;

  &:first-letter {
    text-transform: capitalize;
  }
`;

export const DropdownInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
export const DropdownWrapper = styled.div`
  position: absolute;
  top: 6.2rem;
  width: 100%;
  z-index: 5000;
`;
