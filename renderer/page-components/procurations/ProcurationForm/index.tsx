import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";
import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import DateInput from "components/DateInput/DateInput";
import Form from "components/Form/Form";
import { FormGroup, ScrollFormWrapper } from "components/Form/Form.styled";
import SelectInput from "components/Input/SelectInput";
import TypedInput from "components/Input/TypedInput";
import { ModalActions } from "components/Modal/Modal";

import { INITIAL_VALUES } from "./constants";
import { handleSubmit } from "./handleSubmit";
import { procurationSchema } from "./schema";
import { addModal, removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { ProcurationInitalValues } from "./types";
import { ModalFormConfig } from "types";
import useSoldCarsList from "hooks/useSoldCarsList";
import useClientsList from "hooks/useClientsList";
import TextArea from "components/TextArea";

const ProcurationForm = ({ modalId }: { modalId: string }) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.procurations);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();

  const { clientsList, isLoading: isClientsLoading } = useClientsList();
  const { carsList, isLoading: carsLoading } = useSoldCarsList();

  let formInitialValues = INITIAL_VALUES;
  let submitButtonText = "Ajouter";

  if (currentModal.params?.isEdit) {
    formInitialValues = currentModal.params?.document as ProcurationInitalValues;
    submitButtonText = "Modifier";
  }

  const toggleClientForm = () => dispatch(addModal({ name: "clients", title: "Ajouter un client" }));

  const formProps: FormikConfig<ProcurationInitalValues> = {
    initialValues: formInitialValues,
    validationSchema: procurationSchema,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, currentModal.params);
      if (status === "success") {
        mutate(fetchedUrl);
        mutate(secondaryUrl);
        dispatch(removeModal(modalId));
      }
    },
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<ProcurationInitalValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <ScrollFormWrapper>
              <FormGroup>
                {!carsLoading && (
                  <SelectInput
                    name="car"
                    label="Voiture"
                    placeholder="Nom de voiture"
                    relatedFields={["car_id", "procurator", "moudjahid"]}
                    items={carsList}
                  />
                )}

                <TypedInput name="procurator" type="text" label="Procureur" placeholder="Procureur" />
              </FormGroup>
              <FormGroup>
                <TypedInput name="moudjahid" type="text" label="Moudjahid" placeholder="Moudjahid" disabled />
                <DateInput name="issue_date" label="Date d'émission" />
              </FormGroup>
              <FormGroup>
                <TypedInput name="notary" type="text" label="Notaire" placeholder="Notaire" />
                <DateInput name="purchased_at" label="Date de réception" />
              </FormGroup>
              <FormGroup>
                {!isClientsLoading && (
                  <SelectInput
                    name="seller"
                    label="Vendeur"
                    placeholder="Nom de vendeur"
                    relatedFields={["seller_id"]}
                    items={clientsList}
                    buttons={
                      <Button type="button" variant="ghost" icon="add" onClick={toggleClientForm}>
                        Ajouter un client
                      </Button>
                    }
                  />
                )}
                <TypedInput name="price" type="number" label="Prix" placeholder="0" addOn="DA" />
              </FormGroup>
              <TextArea name="note" label="Note" />
            </ScrollFormWrapper>

            <ModalActions>
              <Button type="submit" variant="primary" loading={isSubmitting}>
                {submitButtonText}
              </Button>
            </ModalActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProcurationForm;
