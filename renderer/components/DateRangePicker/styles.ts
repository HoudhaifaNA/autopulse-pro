import styled from "styled-components";

export const Wrapper = styled.div`
  .mantine-Popover-dropdown {
  }
  .mantine-DatePickerInput {
    &-root {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    &-label,
    &-input {
      font-size: 1.4rem;
      font-family: "Inter", sans-serif;
    }

    &-input {
      height: 4rem;
      color: ${({ theme }) => theme.colors.black};
      border: 0.1rem solid ${({ theme }) => theme.colors.neutral["500"]};
      border-radius: 0.4rem;
    }

    &-icon > svg {
      fill: ${({ theme }) => theme.colors.black};
    }
  }
`;
