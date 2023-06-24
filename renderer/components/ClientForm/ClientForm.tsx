import { useState } from "react";
import { FormikHelpers, FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { SelectInput, TypedInput } from "components/Input/Input";

import { clientSchema } from "Schemas/FormSchemas";
import API from "utils/API";

interface Values {
  fullName: string;
  clientType: string;
  phoneNumber: string;
  balance: number | number;
}

const INITIAL_VALUES = {
  fullName: "",
  clientType: "",
  phoneNumber: "",
  balance: "",
};

const CLIENT_TYPES = [{ mainText: "euro" }, { mainText: "DA" }];

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any,
  setNotification: any,
  addUpModal: any,
  setAddUpModal: any
) => {
  try {
    await API.post("/clients", values);

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
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const values = formProps?.values ?? INITIAL_VALUES;

  return (
    <Form
      title="Ajouter un client"
      initials={INITIAL_VALUES}
      validation={clientSchema}
      onSubmit={onSubmit}
      getFormProps={(formProps) => setFormProps(formProps)}
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
          addOn={values.clientType === "euro" ? "€" : "DA"}
        />
      </FormGroup>
    </Form>
  );
};

export default ClientForm;
