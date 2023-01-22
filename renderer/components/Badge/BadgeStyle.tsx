"use client";

import styled from "styled-components";
import { BadgeProps } from "./Badge";

type BadgeWrapperProps = Omit<BadgeProps, "children">;

export const BadgeWrapper = styled.div<BadgeWrapperProps>`
  width: fit-content;
  padding: 0.4rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${({ theme, $type }) => theme.colors[$type]["200"]};
  color: ${({ theme, $type }) => theme.colors[$type]["700"]};
  border-radius: 10rem;
`;
