import { FormikHelpers } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { TypedInput } from "components/Input/Input";

import { clientSchema } from "Schemas/FormSchemas";

interface Values {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  debt: number;
}

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  debt: 0,
};

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.resetForm();
  }, 1000);
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
          type="tel"
          label="Numéro de téléphone"
          placeholder="Numéro de téléphone du client"
        />
        <TypedInput
          name="debt"
          type="number"
          label="Dette"
          placeholder="Dette"
          addOn="DZD"
        />
      </FormGroup>
    </Form>
  );
};

export default ClientForm;
