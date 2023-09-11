import { ReactNode } from "react";

export interface SDropdownProps {
  $width?: string;
  $top?: string;
  $bottom?: string;
  $left?: string;
  $right?: string;
}

export interface DropdownItem {
  mainText: string;
  icon?: string;
  secondText?: string;
}

export interface DropdownProps extends SDropdownProps {
  items?: DropdownItem[];
  onItemClick?: (values: any) => void;
  iconSize?: "s" | "l";
  children?: ReactNode;
}

export type DropdownItemArgs = Pick<DropdownProps, "items" | "onItemClick" | "iconSize">;
