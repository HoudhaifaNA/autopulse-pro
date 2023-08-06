import { useState } from "react";
import { FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { SelectInput, TypedInput } from "components/Input/Input";

import handleSubmit from "components/ClientForm/handleSubmit";
import { clientSchema } from "Schemas/FormSchemas";

import { Values } from "components/ClientForm/types";

interface ClientFormProps {
  edit?: boolean;
  data?: any;
}

const INITIAL_VALUES: Values = {
  fullName: "",
  clientType: "DA",
  phoneNumber: "",
  balance: 0,
};

const CLIENT_TYPES = [{ mainText: "euro" }, { mainText: "DA" }];

const ClientForm = ({ edit, data }: ClientFormProps) => {
  const [formProps, setFormProps] = useState<FormikProps<Values>>();

  const values = formProps?.values ?? INITIAL_VALUES;
  const clientCurrency = values.clientType === "euro" ? "€" : "DA";

  return (
    <Form
      title="Ajouter un client"
      initials={edit ? { ...data, edit } : INITIAL_VALUES}
      validation={clientSchema}
      onSubmit={handleSubmit}
      getFormProps={(formProps) => setFormProps(formProps)}
      buttonText={edit ? "Modifier" : "Ajouter"}
    >
      <FormGroup>
        <TypedInput
          name="fullName"
          type="text"
          label="Nom et prénom"
          placeholder="Nom et prénom du client"
        />
        <SelectInput
          name="clientType"
          placeholder="Choisissez un type"
          label="Type de client"
          items={CLIENT_TYPES}
          elementAs="div"
          disabled={edit}
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
          addOn={clientCurrency}
          disabled={edit}
        />
      </FormGroup>
    </Form>
  );
};

export default ClientForm;
