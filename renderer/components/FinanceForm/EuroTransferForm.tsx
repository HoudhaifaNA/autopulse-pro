import { useEffect, useState } from "react";
import { FormikProps, FormikHelpers } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import DateInput from "components/FinanceForm/DateInput";
import TransactionType from "components/FinanceForm/TransactionType";
import { TypedInput, SelectInput } from "components/Input/Input";

import * as C from "components/FinanceForm/constants";
import { euroTransferSchema } from "Schemas/FormSchemas";

import { EuroTransferValues as Values } from "components/FinanceForm/types";

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log("Value:", values);
    actions.resetForm();
  }, 1000);
};

const EuroTransferForm = () => {
  const [formProps, setFormProps] = useState<FormikProps<Values>>();

  const values = formProps?.values ?? C.EURO_TRANSFER_VALUES;
  const { euroPrice, amount, total } = values;

  useEffect(() => {
    formProps?.setFieldValue("total", amount * euroPrice);
  }, [euroPrice, amount]);

  return (
    <Form
      title="Transfert d'euros"
      initials={C.EURO_TRANSFER_VALUES}
      validation={euroTransferSchema}
      onSubmit={onSubmit}
      getFormProps={(prop: FormikProps<any>) => setFormProps(prop)}
    >
      <>
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
          <TypedInput
            name="amount"
            type="number"
            label="Montant :"
            placeholder="150000.00"
            addOn="€"
          />
          <TypedInput
            name="euroPrice"
            type="number"
            label="Prix ​​de €100 :"
            placeholder="200.00"
            addOn="€"
          />
        </FormGroup>
        <FormGroup>
          <TypedInput name="total" label="Total :" addOn="DZD" as="div">
            {total.toLocaleString()}
          </TypedInput>
          <SelectInput
            label="Méthode :"
            placeholder="Choisissez une méthode"
            name="method"
            items={C.METHOD_ITEMS}
            elementAs="div"
          />
        </FormGroup>
        <FormGroup>
          <TransactionType options={["acheté", "vendu"]} />
        </FormGroup>
      </>
    </Form>
  );
};

export default EuroTransferForm;
