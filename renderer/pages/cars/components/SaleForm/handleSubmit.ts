import API from "utils/API";
import notify from "utils/notify";
import { SaleInitialValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const handleSubmit: SubmitFunction<SaleInitialValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";

  try {
    const method = params?.isEdit ? "patch" : "post";
    const urlParams = `${params?.resourceId}`;
    const notificationMessage = params?.isEdit
      ? "La vente a été mise à jour avec succès."
      : "La vente a été effectuée avec succès.";

    await API[method](`/cars/sale/${urlParams}`, values);
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
