import API from "utils/API";
import notify from "utils/notify";
import { ProcurationInitalValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const handleSubmit: SubmitFunction<ProcurationInitalValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";
  try {
    const method = params?.isEdit ? "patch" : "post";
    const urlParams = params?.isEdit ? `/${params.resourceId}` : "";
    const notificationMessage = params?.isEdit
      ? "Procuration a été modifié avec succès."
      : "Procuration a été créé avec succès.";

    const data = { ...values };

    await API[method](`/procurations/${urlParams}`, data);
    notify("success", notificationMessage);
  } catch (err: any) {
    let message = "Error";
    if (err.response) {
      message = err.response.data.message.code || err.response.data.message;
    }
    notify("error", message);
    console.log(err);
    status = "error";
  }
  actions.setSubmitting(false);

  return status;
};

export default handleSubmit;
