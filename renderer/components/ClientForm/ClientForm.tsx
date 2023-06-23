import { FormikHelpers } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { TypedInput } from "components/Input/Input";

import { clientSchema } from "Schemas/FormSchemas";
import API from "utils/API";

interface Values {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  balance: number | number;
}

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  balance: "",
};

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any,
  setNotification: any,
  addUpModal: any,
  setAddUpModal: any
) => {
  const { firstName, lastName, phoneNumber, balance } = values;
  const fullName = `${firstName} ${lastName}`;
  try {
    await API.post("/clients", { fullName, phoneNumber, balance });

    if (addUpModal === "clients") {
      setAddUpModal("");
    } else {
      setModal("");
    }
    actions.resetForm();
    setNotification({ status: "success", message: "Client a été créée" });
  } catch (err: any) {
    console.log(err.response.data.message);
    setNotification({ status: "error", message: err.response.data.message });
  }
};

const ClientForm = () => {
  return (
    <Form
      title="Ajouter un client"
      initials={INITIAL_VALUES}
      validation={clientSchema}
      onSubmit={onSubmit}
    >
      <FormGroup>
        <TypedInput
          name="firstName"
          type="text"
          label="Prénom"
          placeholder="Prénom du client"
        />
        <TypedInput
          name="lastName"
          type="text"
          label="Nom"
          placeholder="Nom du client"
        />
      </FormGroup>
      <FormGroup>
        <TypedInput
          name="phoneNumber"
          type="text"
          label="Numéro de téléphone"
          placeholder="Numéro de téléphone du client"
        />
        <TypedInput
          name="balance"
          type="number"
          label="Solde"
          placeholder="0"
          addOn="DA"
        />
      </FormGroup>
    </Form>
  );
};

export default ClientForm;
