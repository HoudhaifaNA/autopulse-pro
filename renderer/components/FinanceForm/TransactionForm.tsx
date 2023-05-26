import { FormikHelpers } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import DateInput from "components/FinanceForm/DateInput";
import TransactionType from "components/FinanceForm/TransactionType";
import { TypedInput, SelectInput } from "components/Input/Input";

import * as C from "components/FinanceForm/constants";
import { transactionSchema } from "Schemas/FormSchemas";

import { TransactionValues as Values } from "components/FinanceForm/types";
import Form from "components/Form/Form";

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log("Value:", values);
    actions.resetForm();
  }, 1000);
};

const TransactionForm = () => {
  return (
    <Form
      title="Effectuer une transaction"
      initials={C.TRANSACTION_VALUES}
      validation={transactionSchema}
      onSubmit={onSubmit}
    >
      <FormGroup>
        <DateInput />
        <SelectInput
          label="Client :"
          placeholder="Entrez le nom"
          name="client"
          items={[]}
        />
      </FormGroup>
      <FormGroup>
        <SelectInput
          label="Méthode :"
          placeholder="Choisissez une méthode"
          name="method"
          items={C.METHOD_ITEMS}
          elementAs="div"
        />
        <TypedInput
          name="amount"
          type="number"
          label="Montant :"
          placeholder="150000.00"
          addOn="DZD"
        />
      </FormGroup>
      <FormGroup>
        <TransactionType options={["entrante", "sortante"]} />
      </FormGroup>
    </Form>
  );
};

export default TransactionForm;
