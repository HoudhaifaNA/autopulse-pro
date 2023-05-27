import { FieldHookConfig } from "formik";

import { DropdownProps } from "components/Dropdown/types";

interface TextInputProps {
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
  addOn?: string;
  onIconClick?: () => void;
}

export type TypedInputProps = TextInputProps & FieldHookConfig<any>;
export type ClickInputProps = { label: string } & FieldHookConfig<any>;

type BaseInputFields = Pick<
  TypedInputProps,
  "label" | "name" | "placeholder" | "autoFocus"
>;

export interface SelectInputProps extends BaseInputFields {
  items: DropdownProps["items"];
  buttons?: DropdownProps["children"];
  elementAs?: "input" | "div";
}
