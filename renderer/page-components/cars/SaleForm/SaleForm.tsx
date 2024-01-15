import { mutate } from "swr";
import { useDispatch } from "react-redux";
import { Formik, FormikConfig, FormikProps } from "formik";

import Form from "components/Form/Form";
import { FormGroup } from "components/Form/Form.styled";
import { SelectInput, TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";
import DateInput from "components/DateInput/DateInput";
import KeysChecker from "../KeysChecker/KeysChecker";
import TextArea from "components/TextArea";
import CheckboxInput from "components/CheckboxInput";
import { ModalActions } from "components/Modal/Modal";

import { useAppSelector } from "store";
import useClientsList from "hooks/useClientsList";
import { addModal, removeModal } from "store/reducers/modals";
import { SaleModalConfig } from "types/modals";
import { SaleInitialValues } from "./types";
import { handleSubmit } from "./handleSubmit";
import { schema } from "./schema";
import { GRAY_CARD_OPTIONS, INITIAL_VALUES, PAPERS_OPTIONS, PROCURATION_OPTIONS } from "./constants";

interface SaleFormProps {
  modalId: string;
}

const SaleForm = ({ modalId }: SaleFormProps) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.cars);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as SaleModalConfig;
  const dispatch = useDispatch();
  const { clientsList, isLoading: isClientsLoading } = useClientsList();

  const documentValues = currentModal.params.document;
  let formInitialValues = { ...INITIAL_VALUES, ...documentValues };
  let submitButtonText = "Vendre";

  if (currentModal.params.isEdit) {
    formInitialValues = documentValues as SaleInitialValues;
    submitButtonText = "Mettre à jour la vente";
  }

  const toggleClientForm = () => dispatch(addModal({ name: "clients", title: "Ajouter un client" }));

  const formProps: FormikConfig<SaleInitialValues> = {
    initialValues: formInitialValues,
    validationSchema: schema,
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
      {({ handleSubmit, isSubmitting }: FormikProps<SaleInitialValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              {!isClientsLoading && (
                <SelectInput
                  name="buyer"
                  label="Acheteur :"
                  placeholder="Nom de acheteur"
                  relatedFields={["buyer_id"]}
                  items={clientsList}
                  buttons={
                    <Button type="button" variant="ghost" icon="add" onClick={toggleClientForm}>
                      Ajouter un client
                    </Button>
                  }
                />
              )}
              <TypedInput name="sold_price" type="number" label="Prix de vente" placeholder="50000.00" addOn="DA" />
            </FormGroup>
            <FormGroup>
              <FormGroup>
                <DateInput label="Date de vente" name="sold_at" />
              </FormGroup>
              <FormGroup>
                <KeysChecker field="given_keys" />
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <FormGroup>
                <CheckboxInput label="Procuration" name="has_procuration" options={PROCURATION_OPTIONS} />
                <CheckboxInput label="Cart grise" name="has_gray_card" options={GRAY_CARD_OPTIONS} />
              </FormGroup>
              <FormGroup>
                <CheckboxInput label="Type de dossier" name="papers_type" options={PAPERS_OPTIONS} />
              </FormGroup>
            </FormGroup>
            <TextArea name="selling_details" label="Détails de vente" />
            <ModalActions>
              <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
                {submitButtonText}
              </Button>
            </ModalActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SaleForm;
