import styled from "styled-components";
import { IconProps } from "./Icon";

interface IconPropsStyle {
  $size: IconProps["size"];
  $isRotated?: IconProps["isRotated"];
}

export const SvgWrapper = styled.svg<IconPropsStyle>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  transform: ${({ $isRotated }) => $isRotated && `rotate(180deg)`};
  fill: currentColor;
  transition: 0.2s ease-in;
`;
