import { FormikHelpers } from "formik";

export type SubmitStatus = "success" | "error";
export type SubmitFunction<T, E = undefined> = (
  values: T,
  actions: FormikHelpers<T>,
  extraArgs?: E
) => Promise<SubmitStatus>;
