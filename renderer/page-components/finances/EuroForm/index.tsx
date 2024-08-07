import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";

import { ModalActions } from "components/Modal/Modal";
import Button from "components/Button/Button";
import { FormGroup } from "components/Form/Form.styled";
import SelectInput from "components/Input/SelectInput";
import DateInput from "components/DateInput/DateInput";
import TypedInput from "components/Input/TypedInput";
import Form from "components/Form/Form";

import useClientsList from "hooks/useClientsList";
import dateToString from "utils/dateToString";
import { useAppSelector } from "store";
import { addModal, removeModal } from "store/reducers/modals";
import { INITIAL_VALUES } from "./constants";
import { DIRECTION_ITEMS, METHOD_ITEMS } from "../constants";
import { FiatFormInitialValues } from "../types";
import { handleSubmit } from "../handleSubmit";
import { transactionSchema } from "../schema";
import { ModalFormConfig } from "types";
import TextArea from "components/TextArea";

const EuroForm = ({ modalId }: { modalId: string }) => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.transactionsEUR);
  const clientsURLs = useAppSelector((state) => state.resourceUrls.clients);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();
  const { clientsList, isLoading: isClientsLoading } = useClientsList();

  let formInitialValues = INITIAL_VALUES;
  let submitButtonText = "Ajouter";
  if (currentModal.params?.document) {
    formInitialValues = currentModal.params.document as FiatFormInitialValues;
  }

  if (currentModal.params?.isEdit) {
    submitButtonText = "Modifier";
  }

  useEffect(() => {
    if (!currentModal.params?.document && !currentModal.params?.isEdit) {
      formInitialValues.transaction_date = dateToString(new Date());
    }
  }, []);

  const toggleClientForm = () => dispatch(addModal({ name: "clients", title: "Ajouter un client" }));

  const formProps: FormikConfig<FiatFormInitialValues> = {
    initialValues: formInitialValues,
    validationSchema: transactionSchema,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, currentModal.params);
      if (status === "success") {
        mutate(fetchedUrl);
        mutate(clientsURLs.fetchedUrl);
        mutate(clientsURLs.secondaryUrl);
        dispatch(removeModal(modalId));
      }
    },
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<FiatFormInitialValues>) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            {!isClientsLoading && (
              <SelectInput
                name="client"
                label="Client"
                placeholder="Nom de client"
                relatedFields={["client_id"]}
                items={clientsList}
                buttons={
                  <Button type="button" variant="ghost" icon="add" onClick={toggleClientForm}>
                    Ajouter un client
                  </Button>
                }
              />
            )}
            <TypedInput name="recipient" label="Destinataire :" placeholder="Destinataire" />
          </FormGroup>
          <FormGroup>
            <SelectInput
              label="Méthode :"
              placeholder="Choisissez une méthode"
              name="info2"
              items={METHOD_ITEMS}
              elementAs="div"
            />
            <TypedInput name="amount" type="number" label="Montant :" placeholder="15000" addOn="€" />
          </FormGroup>
          <FormGroup>
            <DateInput name="transaction_date" label="Date de transaction" />
            <SelectInput
              label="Direction :"
              placeholder="Choisissez une direction"
              name="direction"
              items={DIRECTION_ITEMS}
              elementAs="div"
            />
          </FormGroup>
          <TextArea name="note" label="Note" />
          <ModalActions>
            <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
              {submitButtonText}
            </Button>
          </ModalActions>
        </Form>
      )}
    </Formik>
  );
};

export default EuroForm;
