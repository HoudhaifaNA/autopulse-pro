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
  balance: number;
}

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  balance: 0,
};

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any
) => {
  const { firstName, lastName, phoneNumber, balance } = values;
  const fullName = `${firstName} ${lastName}`;
  try {
    await API.post("/clients", { fullName, phoneNumber, balance });

    setModal("");
    actions.resetForm();
  } catch (err: any) {
    console.log(err.response.data.message);
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
          autoFocus
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
          placeholder="Solde"
          addOn="DZD"
        />
      </FormGroup>
    </Form>
  );
};

export default ClientForm;
