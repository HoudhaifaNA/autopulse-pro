"use client";
import styled, { css } from "styled-components";

const setElementDeclerartions = (
  fontSize: number,
  weight: number,
  lineHeight: number
) => {
  return css`
    font-size: ${fontSize}rem;
    font-weight: ${weight};
    line-height: ${lineHeight}rem;
  `;
};

export const Heading1 = styled.h1`
  ${setElementDeclerartions(3.981, 700, 5.6)}
`;

export const Heading2 = styled.h2`
  ${setElementDeclerartions(3.318, 700, 4.8)}
`;

export const Heading3 = styled.h3`
  ${setElementDeclerartions(2.765, 700, 4)}
`;

export const Heading4 = styled.h4`
  ${setElementDeclerartions(2.304, 500, 3.2)}
`;

export const Heading5 = styled.h5`
  ${setElementDeclerartions(1.92, 500, 3.2)}
`;

export const Subtitle = styled.p`
  ${setElementDeclerartions(1.6, 400, 3.2)}
`;

export const Body1 = styled.p`
  ${setElementDeclerartions(1.6, 400, 2.4)}
`;

export const Body2 = styled.p`
  ${setElementDeclerartions(1.4, 400, 1.6)}
`;

export const ButtonText = styled.span`
  ${setElementDeclerartions(1.4, 500, 1.6)}
  letter-spacing: 0.0125em;
`;

export const LabelText = styled.label`
  ${setElementDeclerartions(1.4, 500, 1.6)}
  display: block;
`;
