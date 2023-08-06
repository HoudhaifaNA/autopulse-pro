import { FormikHelpers } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { TypedInput } from "components/Input/Input";

import { expenseSchema } from "Schemas/FormSchemas";
import API from "utils/API";
import DateInput from "components/DateInput/DateInput";
import { mutate } from "swr";

interface Values {
  id?: number;
  raison: string;
  amount: number | string;
  transferred_at: Date;
  edit?: false;
}

const INITIAL_VALUES = {
  raison: "",
  amount: "",
  transferred_at: new Date(),
};

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  context: any
) => {
  const { setModal, setNotification } = context;
  try {
    const method = values.edit ? "patch" : "post";
    const endpoint = values.edit ? `/expenses/${values.id}` : "/expenses";

    await API[method](endpoint, values);
    mutate("/expenses");
    setModal("");
    actions.resetForm();
    setNotification({ status: "success", message: "Dépense a été créée" });
  } catch (err: any) {
    console.log(err.response.data.message);
    setNotification({ status: "error", message: err.response.data.message });
  }
};

const ExpenseForm = ({ edit, data }: { edit?: boolean; data: any }) => {
  return (
    <Form
      title="Ajouter une dépense"
      initials={data ? { ...data, edit: true } : INITIAL_VALUES}
      validation={expenseSchema}
      onSubmit={onSubmit}
      buttonText={edit ? "Modifier" : "Ajouter"}
    >
      <FormGroup>
        <TypedInput
          name="raison"
          type="text"
          label="Raison"
          placeholder="Acheter une imprimante"
        />
        <TypedInput
          name="amount"
          type="text"
          label="Montant"
          placeholder="15000"
          addOn="DA"
        />
      </FormGroup>
      <FormGroup>
        <DateInput
          name="transferred_at"
          label="Date de transfert"
          minDate="2015"
        />
      </FormGroup>
    </Form>
  );
};

export default ExpenseForm;
