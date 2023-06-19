import useSWR from "swr";
import { useEffect, useState } from "react";
import { FormikProps, FormikHelpers } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import DateInput from "components/DateInput/DateInput";
import TransactionType from "components/FinancesForm/TransactionType";
import { TypedInput, SelectInput } from "components/Input/Input";

import * as C from "components/FinancesForm/constants";
import { euroTransferSchema } from "Schemas/FormSchemas";

import { EuroTransferValues as Values } from "components/FinancesForm/types";
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

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any,
  setNotification: any
) => {
  const { date, client, method, amount, euroPrice, total, direction } = values;
  const data = {
    date,
    clientId: client.id,
    type: "euros",
    info1: "Euros",
    info2: method,
    info3: amount,
    info4: euroPrice,
    total,
    direction,
  };
  try {
    await API.post("/transactions", data);

    setModal("");
    setNotification({ status: "success", message: "Transfert d'euros réussi" });
  } catch (err: any) {
    console.log(err.response.data.message);
    setNotification({ status: "error", message: err.response.data.message });
  }
};

const EuroTransferForm = () => {
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const CLIENTS_LIST = getClients();

  const values = formProps?.values ?? C.EURO_TRANSFER_VALUES;
  const { euroPrice, amount, total, direction } = values;
  const buttonText = direction === "entrante" ? "Acheter" : "Vendre";

  useEffect(() => {
    formProps?.setFieldValue(
      "total",
      (Number(amount) * Number(euroPrice)) / 100
    );
  }, [euroPrice, amount]);

  return (
    <Form
      title="Transfert d'euros"
      initials={C.EURO_TRANSFER_VALUES}
      validation={euroTransferSchema}
      onSubmit={onSubmit}
      buttonText={buttonText}
      getFormProps={(prop: FormikProps<any>) => setFormProps(prop)}
    >
      <>
        <FormGroup>
          <SelectInput
            label="Client :"
            placeholder="Entrez le nom"
            name="client.name"
            items={CLIENTS_LIST}
            relatedFields={["client.id"]}
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
        </FormGroup>
        <FormGroup>
          <TypedInput
            name="amount"
            type="number"
            label="Montant :"
            placeholder="150000"
            addOn="€"
          />
          <TypedInput
            name="euroPrice"
            type="number"
            label="Prix ​​de €100 :"
            placeholder="200"
            addOn="€"
          />
          <TypedInput name="total" label="Total :" addOn="DZD" as="div">
            {total.toLocaleString()}
          </TypedInput>
        </FormGroup>
        <FormGroup>
          <FormGroup />
          <FormGroup />
          <FormGroup>
            <TransactionType options={["entrante", "sortante"]} />
          </FormGroup>
        </FormGroup>
      </>
    </Form>
  );
};

export default EuroTransferForm;
