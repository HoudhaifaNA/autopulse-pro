import { ReactElement } from "react";

export interface SDropdownProps {
  $width?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}

interface Item {
  mainText: string;
  icon?: string;
  secondText?: string;
  relatedValues?: string[];
}

export interface DropdownProps extends SDropdownProps {
  items?: Item[];
  onItemClick?: (values: any) => void;
  iconSize?: "s" | "l";
  children?: ReactElement | ReactElement[];
}

export type DropdownItemArgs = Pick<
  DropdownProps,
  "items" | "onItemClick" | "iconSize"
>;
