import { AxiosError } from "axios";

import API from "utils/API";
import notify from "utils/notify";
import { FiatFormInitialValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const handleSubmit: SubmitFunction<FiatFormInitialValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";
  try {
    const { client_id, transaction_date, type, info1, info2, direction, currency, note } = values;

    const method = params?.isEdit ? "patch" : "post";
    const urlParams = params?.isEdit ? `/${params.resourceId}` : "";
    const notificationMessage = params?.isEdit
      ? "Transaction a été modifiée avec succès."
      : "Transaction a été créée avec succès.";
    const amount = values.direction === "entrante" ? values.amount : -values.amount;
    const data = { client_id, transaction_date, type, info1, info2, direction, currency, amount, note };

    await API[method](`/transactions/${urlParams}`, data);
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
