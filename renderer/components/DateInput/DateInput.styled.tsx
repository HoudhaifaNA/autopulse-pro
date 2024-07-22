import styled from "styled-components";

interface DateStyle {
  $hasError: boolean;
}

export const DateInputWrapper = styled.div<DateStyle>`
  width: 100%;
  height: 8.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  .mantine-DatePickerInput {
    &-root {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    &-input {
      height: 4rem;
      font-size: 1.4rem;
      font-family: "Inter", sans-serif;
      color: ${({ theme, $hasError }) =>
        $hasError ? theme.colors.error["700"] : theme.colors.black};
      border: 0.1rem solid
        ${({ theme, $hasError }) =>
          $hasError ? theme.colors.error["700"] : theme.colors.neutral["500"]};
      border-radius: 0.4rem;
    }

    &-icon > svg {
      fill: ${({ theme, $hasError }) =>
        $hasError ? theme.colors.error["700"] : theme.colors.black};
    }
  }
`;
