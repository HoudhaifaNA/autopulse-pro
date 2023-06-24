import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { FormikHelpers, FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import DateInput from "components/DateInput/DateInput";
import TransactionType from "components/FinancesForm/TransactionType";
import { TypedInput, SelectInput, ClickInput } from "components/Input/Input";

import * as C from "components/FinancesForm/constants";
import { transactionSchema } from "Schemas/FormSchemas";

import { TransactionValues as Values } from "components/FinancesForm/types";
import API, { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Button/Button";

const getClients = () => {
  const clientsRes = useSWR("/clients", fetcher, { refreshInterval: 3 });
  let CLIENTS_LIST = [];

  if (clientsRes.data) {
    CLIENTS_LIST = clientsRes.data.clients.map(({ id, fullName }: any) => {
      return { mainText: fullName, relatedValues: [id] };
    });
  }

  return CLIENTS_LIST;
};

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any,
  setNotification: any
) => {
  const { date, client, type, method, amount, direction } = values;

  const data = {
    date,
    clientId: client.id,
    type,
    info1: "Argent",
    info2: method,
    total: amount,
    direction,
  };
  try {
    console.log(type);

    await API.post("/transactions", data);

    setModal("");
    setNotification({ status: "success", message: "Transaction réussie" });
  } catch (err: any) {
    console.log(err.response.data.message);
    setNotification({ status: "error", message: err.response.data.message });
  }
};

const TransactionForm = () => {
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const values = formProps?.values ?? C.TRANSACTION_VALUES;

  const CLIENTS_LIST = getClients();
  const { setAddUpModal } = useContext(GlobalContext);

  useEffect(() => {
    if (values.type === "euroTransfer") {
      formProps?.setFieldValue("direction", "sortante");
    }
  }, [values.type, values.direction]);

  return (
    <Form
      title="Effectuer un transfert"
      initials={C.TRANSACTION_VALUES}
      validation={transactionSchema}
      buttonText="Transfert"
      onSubmit={onSubmit}
      getFormProps={(formProps) => setFormProps(formProps)}
    >
      <FormGroup>
        <SelectInput
          label="Client :"
          placeholder="Entrez le nom"
          name="client.name"
          items={CLIENTS_LIST}
          relatedFields={["client.id"]}
          buttons={
            <ButtonItem>
              <Button
                type="button"
                variant="ghost"
                icon="add"
                onClick={() => setAddUpModal("clients")}
              >
                Ajouter un client
              </Button>
            </ButtonItem>
          }
        />
      </FormGroup>
      <FormGroup>
        <DateInput name="date" minDate="2014" />
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
          placeholder="150000"
          addOn={values.type === "euroTransfer" ? "€" : "DA"}
        />
      </FormGroup>
      <FormGroup>
        <FormGroup />
        <FormGroup />
        <FormGroup>
          <TransactionType options={["entrante", "sortante"]} />
        </FormGroup>
        <FormGroup>
          <ClickInput type="radio" name="type" label="DA" value="DA" />
          <ClickInput
            type="radio"
            name="type"
            label="Euro"
            value="euroTransfer"
          />
        </FormGroup>
      </FormGroup>
    </Form>
  );
};

export default TransactionForm;
