import { FieldHookConfig } from "formik";

interface TextInputProps {
  label?: string;
  iconLeft?: string;
  iconRight?: string;
  addOn?: string;
}

export type TypedInputProps = TextInputProps & FieldHookConfig<any>;
export type ClickInputProps = { label: string } & FieldHookConfig<any>;
