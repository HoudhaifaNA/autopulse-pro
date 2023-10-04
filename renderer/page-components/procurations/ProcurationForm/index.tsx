import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";
import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import DateInput from "components/DateInput/DateInput";
import Form from "components/Form/Form";
import { FormGroup } from "components/Form/Form.styled";
import SelectInput from "components/Input/SelectInput";
import TypedInput from "components/Input/TypedInput";
import { ModalActions } from "components/Modal/Modal";

import { INITIAL_VALUES, TYPE_ITEMS } from "./constants";
import { handleSubmit } from "./handleSubmit";
import { procurationSchema } from "./schema";
import { addModal, removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { ProcurationInitalValues } from "./types";
import { ModalFormConfig } from "types";
import useLicencesList from "hooks/useLicencesList";

const ProcurationForm = ({ modalId }: { modalId: string }) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.procurations);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();
  const document = currentModal.params?.document as ProcurationInitalValues;

  const params = currentModal.params?.isEdit ? { id: document.licence_id } : {};
  const { licencesList, isLoading: isLicencesLoading } = useLicencesList("procuration", params);

  let formInitialValues = INITIAL_VALUES;
  let isFormDisabled = false;
  let submitButtonText = "Ajouter";

  if (currentModal.params?.isEdit) {
    formInitialValues = currentModal.params?.document as ProcurationInitalValues;
    isFormDisabled = true;
    submitButtonText = "Modifier";
  }

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
            <FormGroup>
              {!isLicencesLoading && (
                <SelectInput
                  name="moudjahid"
                  label="Moudjahid"
                  placeholder="Nom de moudjahid"
                  relatedFields={["licence_id"]}
                  items={licencesList}
                  disabled={isFormDisabled}
                />
              )}
              <TypedInput name="notary" type="text" label="Notaire" placeholder="Notaire" />
            </FormGroup>
            <FormGroup>
              <DateInput name="purchased_at" label="Date de réception" />

              <TypedInput name="price" type="number" label="Prix" placeholder="0" addOn="DA" />
            </FormGroup>
            <FormGroup>
              <DateInput name="issue_date" label="Date d'émission" />
              <DateInput name="received_at" label="Date de livraison" clearable />
            </FormGroup>
            <FormGroup>
              <SelectInput
                label="Type :"
                placeholder="Choisissez un type"
                name="type_ui"
                items={TYPE_ITEMS}
                elementAs="div"
                relatedFields={["type"]}
              />
            </FormGroup>

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
