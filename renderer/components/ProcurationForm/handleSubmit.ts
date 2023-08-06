import { mutate } from "swr";

import API from "utils/API";
import { FormikSubmit } from "types";
import { Values } from "components/ProcurationForm/types";

const handleSubmit: FormikSubmit<Values> = async (values, actions, context) => {
  const { currModal, setModal, setNotification } = context;
  let message;

  try {
    const {
      id,
      edit,
      car,
      created_at,
      issued_date,
      price,
      received_date,
      type,
    } = values;
    let procurationType = type === "transaction" ? "transaction" : "expense";
    const method = edit ? "patch" : "post";
    const endpoint = edit ? `/procurations/${id}` : "/procurations";

    await API[method](endpoint, {
      licenceId: car.licenceId,
      created_at,
      issued_date,
      price,
      type: procurationType,
      received_date,
    });
    mutate("/procurations");

    if (currModal.name === "procurations") setModal("");

    actions.resetForm();
    message = edit ? "Procuration a été modifiée" : "Procuration a été créée";
    setNotification({ status: "success", message });
  } catch (err: any) {
    console.log(err);
    message = "Error";
    if (err.response) message = err.response.data.message;
    setNotification({ status: "error", message });
  }
};

export default handleSubmit;
