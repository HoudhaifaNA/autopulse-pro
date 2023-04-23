import { ReactElement } from "react";

export interface SDropdownProps {
  $width?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}

export interface DropdownProps extends SDropdownProps {
  items: { mainText: string; icon?: string; secondText?: string }[];
  onItemClick: (text: string) => void;
  size?: "s" | "l";
  children?: ReactElement | ReactElement[];
}

export type DropdownItemArgs = Pick<
  DropdownProps,
  "items" | "onItemClick" | "size"
>;
