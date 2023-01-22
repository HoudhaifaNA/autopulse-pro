"use client";

import styled from "styled-components";
import { ToasterProps } from "./Toaster";

type ToasterWrapperProps = Omit<ToasterProps, "children">;

export const ToasterWrapper = styled.div<ToasterWrapperProps>`
  display: flex;
  align-items: center;
  gap: 1.4rem;
  padding: 1.5rem 1rem;
  width: 45rem;
  border-bottom: 0.4rem solid
    ${({ theme, $type }) => theme.colors[$type]["500"]};
  border-radius: 0.4rem;
  box-shadow: 0 1rem 2rem 0.2rem rgba(0, 0, 0, 0.15);

  p {
    flex: 1;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  svg:first-child {
    fill: ${({ theme, $type }) => theme.colors[$type]["500"]};
  }

  svg:last-child {
    fill: ${({ theme }) => theme.colors.neutral["500"]};
    cursor: pointer;
  }
`;
