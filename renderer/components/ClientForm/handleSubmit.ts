import { mutate } from "swr";

import API from "utils/API";
import { FormikSubmit } from "types";
import { Values } from "components/ClientForm/types";

const handleSubmit: FormikSubmit<Values> = async (values, actions, context) => {
  const { addUpModal, setAddUpModal, currModal, setModal, setNotification } =
    context;
  let message;

  try {
    const { id, edit, fullName, clientType, phoneNumber, balance } = values;
    const method = edit ? "patch" : "post";
    const endpoint = edit ? `/clients/${id}` : "/clients";

    await API[method](endpoint, { fullName, clientType, phoneNumber, balance });
    mutate("/clients");

    if (addUpModal === "clients") setAddUpModal("");
    if (currModal.name === "clients") setModal("");

    actions.resetForm();
    message = edit ? "Client a été modifiée" : "Client a été créée";
    if (values.edit) mutate(`/clients/${values.id}`);
    setNotification({ status: "success", message });
  } catch (err: any) {
    console.log(err);
    message = "Error";
    if (err.response) message = err.response.data.message;
    setNotification({ status: "error", message });
  }
};

export default handleSubmit;
