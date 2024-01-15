import { AxiosError } from "axios";

import notify from "utils/notify";
import API from "utils/API";
import { SubmitFunction, SubmitStatus } from "types";
import { InititalValues } from "./types";

const handleSubmit: SubmitFunction<InititalValues, string> = async ({ password }, actions, url) => {
  let status: SubmitStatus = "success";
  try {
    await API.delete(url!, { data: { password } });
    notify("success", "Suppression a été effectuée avec succès.");
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
