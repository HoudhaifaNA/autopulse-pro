import API from "utils/API";
import notify from "utils/notify";
import redirectToPath from "utils/convertPath";

import { UserCredentials } from "./types";

const handleSubmit = async (values: UserCredentials) => {
  try {
    const { username, password } = values;
    await API.post("/users/login", { username, password });

    notify("success", "Connecté avec succès");

    setTimeout(() => {
      redirectToPath("clients");
    }, 500);
  } catch (err: any) {
    let message = "Error";
    if (err.response) {
      message = err.response.data.message;
    }
    notify("error", message);
    console.log(err);
  }
};

export { handleSubmit };
