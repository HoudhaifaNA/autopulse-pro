import useSWR from "swr";
import { FormikHelpers } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import DateInput from "components/DateInput/DateInput";
import TransactionType from "components/FinancesForm/TransactionType";
import { TypedInput, SelectInput } from "components/Input/Input";

import * as C from "components/FinancesForm/constants";
import { transactionSchema } from "Schemas/FormSchemas";

import { TransactionValues as Values } from "components/FinancesForm/types";
import API, { fetcher } from "utils/API";

const getClients = () => {
  const clientsRes = useSWR("/clients", fetcher);
  let CLIENTS_LIST = [];

  if (clientsRes.data) {
    CLIENTS_LIST = clientsRes.data.clients.map(({ id, fullName }: any) => {
      return { mainText: fullName, relatedValues: [id] };
    });
  }

  return CLIENTS_LIST;
};

const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
  const { date, client, method, amount, direction } = values;
  const data = {
    date,
    clientId: client.id,
    type: "money",
    info1: "Argent",
    info2: method,
    total: amount,
    direction,
  };
  try {
    await API.post("/transactions", data);

    actions.resetForm();
  } catch (err: any) {
    console.log(err.response.data.message);
  }
};

const TransactionForm = () => {
  const CLIENTS_LIST = getClients();
  return (
    <Form
      title="Effectuer un transfert"
      initials={C.TRANSACTION_VALUES}
      validation={transactionSchema}
      buttonText="Transfert"
      onSubmit={onSubmit}
    >
      <FormGroup>
        <DateInput name="date" minDate="2014" />
        <SelectInput
          label="Client :"
          placeholder="Entrez le nom"
          name="client.name"
          items={CLIENTS_LIST}
          relatedFields={["client.id"]}
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
