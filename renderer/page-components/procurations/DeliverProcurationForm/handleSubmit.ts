import { AxiosError } from "axios";

import API from "utils/API";
import notify from "utils/notify";
import { DeliverProcurationInitalValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const handleSubmit: SubmitFunction<DeliverProcurationInitalValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";
  try {
    const urlParams = `${params?.resourceId}`;
    const notificationMessage = "Procuration a été livré avec succès.";

    await API.patch(`/procurations/${urlParams}/deliver`, values);
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
