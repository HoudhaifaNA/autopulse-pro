import { AxiosError } from "axios";

import API from "utils/API";
import notify from "utils/notify";
import { ExchangeRateInitialValue } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  ids: string;
}

const handleSubmit: SubmitFunction<ExchangeRateInitialValue, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";

  try {
    await API.patch(`/cars/exr/${params?.ids}`, values);
    notify("success", "taux de change mis à jour avec succès");
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
