import { FieldHookConfig } from "formik";

interface TextInputProps {
  label?: string;
  iconLeft?: string;
  iconRight?: string;
  addOn?: string;
  onIconClick?: () => void;
}

export type TypedInputProps = TextInputProps & FieldHookConfig<any>;
export type ClickInputProps = { label: string } & FieldHookConfig<any>;
