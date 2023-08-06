import { mutate } from "swr";

import API from "utils/API";
import { FormikSubmit } from "types";
import { Values } from "components/PaperForm/types";

const handleSubmit: FormikSubmit<Values> = async (values, actions, context) => {
  const { currModal, setModal, setNotification } = context;
  let message;

  try {
    const {
      id,
      edit,
      car,
      seller,
      created_at,
      issued_date,
      price,
      received_date,
      type,
    } = values;
    let procurationType = type === "transaction" ? "transaction" : "expense";
    const method = edit ? "patch" : "post";
    const endpoint = edit ? `/papers/${id}` : "/papers";

    await API[method](endpoint, {
      carId: car.id,
      sellerId: seller.id,
      created_at,
      issued_date,
      price,
      type: procurationType,
      received_date,
    });
    mutate("/papers");

    if (currModal.name === "papers") setModal("");

    actions.resetForm();
    message = edit ? "Dossier a été modifiée" : "Dossier a été créée";
    setNotification({ status: "success", message });
  } catch (err: any) {
    console.log(err);
    message = "Error";
    if (err.response) message = err.response.data.message;
    setNotification({ status: "error", message });
  }
};

export default handleSubmit;
