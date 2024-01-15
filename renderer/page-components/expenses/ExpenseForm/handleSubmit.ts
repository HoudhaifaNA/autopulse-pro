import { AxiosError } from "axios";

import API from "utils/API";
import notify from "utils/notify";
import { ExpenseIntitalValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const handleSubmit: SubmitFunction<ExpenseIntitalValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";
  try {
    const method = params?.isEdit ? "patch" : "post";
    const urlParams = params?.isEdit ? `/${params.resourceId}` : "";
    const notificationMessage = params?.isEdit
      ? "La dépense a été modifiée avec succès."
      : "La dépense a été créée avec succès.";

    await API[method](`/expenses/${urlParams}`, values);
    notify("success", notificationMessage);
  } catch (err: any) {
    let message = "Error";
    if (err instanceof AxiosError && typeof err.response?.data.message === "string") {
      message = err.response.data.message;
    }
    notify("error", message);
    console.log(err);
    status = "error";
  }
  actions.setSubmitting(false);

  return status;
};

export { handleSubmit };
