import API from "utils/API";
import notify from "utils/notify";

import { UpdatePasswordInitialValues } from "./types";
import { SubmitFunction } from "types";

const handleSubmit: SubmitFunction<UpdatePasswordInitialValues> = async (values, actions) => {
  try {
    await API.patch("/users/updateMe", values);

    notify("success", "Mot de passe modifié avec succès");
    actions.resetForm();
    return "success";
  } catch (err: any) {
    let message = "Error";
    if (err.response) {
      message = err.response.data.message.code || err.response.data.message;
    }
    notify("error", message);
    console.log(err);
    return "error";
  }
};

export { handleSubmit };
