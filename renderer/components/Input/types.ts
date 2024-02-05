import { FieldHookConfig } from "formik";

import { DropdownItem, DropdownProps } from "components/Dropdown/types";

interface TextInputProps {
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
  addOn?: string;
  onIconClick?: () => void;
}

export type MultiSelectInputProps = FieldHookConfig<any> & {
  label?: string;
  options: string[];
};

export type TypedInputProps = TextInputProps & FieldHookConfig<any>;
export type ClickInputProps = { label: string } & FieldHookConfig<any>;

type BaseInputFields = Pick<TypedInputProps, "label" | "name" | "placeholder" | "autoFocus">;

export interface SelectOption extends DropdownItem {
  relatedValues?: (string | number)[];
}

export interface SelectInputProps extends BaseInputFields {
  items: SelectOption[];
  relatedFields?: (string | null)[];
  iconSize?: DropdownProps["iconSize"];
  buttons?: DropdownProps["children"];
  elementAs?: "input" | "div";
  sorted?: boolean;
  disabled?: boolean;
}
