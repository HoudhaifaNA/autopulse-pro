import { AxiosError } from "axios";

import API from "utils/API";
import notify from "utils/notify";
import { ClientInitialValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const handleSubmit: SubmitFunction<ClientInitialValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";
  try {
    const { full_name, email, address, phone } = values;
    const method = params?.isEdit ? "patch" : "post";
    const urlParams = params?.isEdit ? `/${params.resourceId}` : "";
    const notificationMessage = params?.isEdit ? "Client a été modifié avec succès." : "Client a été créé avec succès.";
    let data = {};
    if (params?.isEdit) {
      data = {
        full_name,
        email,
        address,
        phone,
      };
    } else {
      data = values;
    }

    await API[method](`/clients/${urlParams}`, data);
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
