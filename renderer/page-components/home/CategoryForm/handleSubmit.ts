import { AxiosError } from "axios";

import API from "utils/API";
import notify from "utils/notify";
import { CategoryInitalValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const handleSubmit: SubmitFunction<CategoryInitalValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";
  try {
    const { name } = values;

    const method = params?.isEdit ? "patch" : "post";
    const urlParams = params?.isEdit ? `/${params.resourceId}` : "";
    const notificationMessage = params?.isEdit
      ? "Category a été modifiée avec succès."
      : "Category a été créée avec succès.";

    await API[method](`/categories/${urlParams}`, { name });
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
