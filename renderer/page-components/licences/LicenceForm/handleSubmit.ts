import { AxiosError } from "axios";

import API from "utils/API";
import notify from "utils/notify";
import { LicenceInitalValues } from "./types";
import { SubmitFunction, SubmitStatus } from "types";

interface Params {
  isEdit: boolean;
  resourceId: number;
}

const valuesToFormData = (values: LicenceInitalValues) => {
  const formData = new FormData();

  Object.entries(values).map(([key, value]) => {
    if (key === "attachments") {
      return values.attachments.forEach((attachment) => formData.append("attachments", attachment.file));
    } else {
      return formData.append(key, value);
    }
  });

  return formData;
};

const handleSubmit: SubmitFunction<LicenceInitalValues, Params> = async (values, actions, params) => {
  let status: SubmitStatus = "success";
  try {
    const method = params?.isEdit ? "patch" : "post";
    const urlParams = params?.isEdit ? `/${params.resourceId}` : "";
    const notificationMessage = params?.isEdit
      ? "Licence a été modifié avec succès."
      : "Licence a été créé avec succès.";

    let data = {};
    if (params?.isEdit) {
      const { moudjahid, seller_id, purchased_at, issue_date, serial_number, wilaya, note, price } = values;
      data = {
        moudjahid,
        seller_id,
        purchased_at,
        issue_date,
        serial_number,
        wilaya,
        price,
        note,
      };
    } else {
      data = valuesToFormData(values);
    }

    await API[method](`/licences/${urlParams}`, data);
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
