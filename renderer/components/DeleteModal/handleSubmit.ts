import { AxiosError } from "axios";

import notify from "utils/notify";
import API from "utils/API";
import { SubmitFunction, SubmitStatus } from "types";
import { InititalValues } from "./types";

const handleSubmit: SubmitFunction<InititalValues, string> = async ({ password }, actions, url) => {
  let status: SubmitStatus = "success";
  try {
    const method = url?.includes("reserve") ? "patch" : "delete";
    const data = method === "patch" ? { password } : { data: { password } };

    //@ts-ignore
    await API[method](url!, data);
    notify("success", "Succès.");
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

export default handleSubmit;
