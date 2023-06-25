import { useState } from "react";
import { FormikHelpers, FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { SelectInput, TypedInput } from "components/Input/Input";

import { clientSchema } from "Schemas/FormSchemas";
import API from "utils/API";

interface Values {
  id?: number;
  fullName: string;
  clientType: string;
  phoneNumber: string;
  balance: number | number;
  edit?: false;
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
  console.log(values.edit);

  try {
    const method = values.edit ? "patch" : "post";
    const endpoint = values.edit ? `/clients/${values.id}` : "/clients";

    await API[method](endpoint, values);

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

const ClientForm = ({ edit, data }: { edit?: boolean; data?: any }) => {
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const values = formProps?.values ?? INITIAL_VALUES;

  return (
    <Form
      title="Ajouter un client"
      initials={data ? { ...data, edit: true } : INITIAL_VALUES}
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
          addOn={values.clientType === "euro" ? "€" : "DA"}
          disabled={edit}
        />
      </FormGroup>
    </Form>
  );
};

export default ClientForm;
