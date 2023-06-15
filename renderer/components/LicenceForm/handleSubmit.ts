import { FormikHelpers } from "formik";
import dayjs from "dayjs";

import API from "utils/API";

import { Values } from "./types";

const handleSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any
) => {
  const formData = new FormData();

  Object.entries(values).map(([key, value]) => {
    if (key === "seller") return formData.append("sellerId", value.id);
    if (key === "releasedDate") {
      return formData.append(key, dayjs(value).format("YYYY-MM-DD"));
    }
    if (key === "attachments") {
      return values.attachments.forEach((atc) =>
        formData.append("attachments", atc.file)
      );
    }
    return formData.append(key, value);
  });

  try {
    await API.post("/licences", formData);
    setModal("");
  } catch (err: any) {
    console.log(err.response.data.message);
  }
  actions.setSubmitting(false);
};

export default handleSubmit;
