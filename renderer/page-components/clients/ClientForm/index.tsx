import { useDispatch } from "react-redux";
import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";

import Form from "components/Form/Form";
import Button from "components/Button/Button";
import { FormGroup } from "components/Form/Form.styled";
import { TypedInput } from "components/Input/Input";
import { ModalActions } from "components/Modal/Modal";

import { useAppSelector } from "store";
import { removeModal } from "store/reducers/modals";
import { handleSubmit } from "./handleSubmit";
import { clientSchema } from "./schema";
import { ClientInitialValues } from "./types";
import { ModalFormConfig } from "types";

interface ClientFormProps {
  modalId: string;
}

const INITIAL_VALUES: ClientInitialValues = {
  full_name: "",
  email: "",
  address: "",
  phone: "",
  dzd_balance: 0,
  eur_balance: 0,
};

const ClientForm = ({ modalId }: ClientFormProps) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.clients);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();

  let formInitialValues = INITIAL_VALUES;
  let isFormDisabled = false;
  let submitButtonText = "Ajouter";

  if (currentModal.params?.isEdit) {
    formInitialValues = currentModal.params?.document as ClientInitialValues;
    isFormDisabled = true;
    submitButtonText = "Modifier";
  }

  const formProps: FormikConfig<ClientInitialValues> = {
    initialValues: formInitialValues,
    validationSchema: clientSchema,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, currentModal.params);
      if (status === "success") {
        mutate(fetchedUrl);
        mutate("/clients/list");
        mutate(secondaryUrl);
        dispatch(removeModal(modalId));
      }
    },
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<ClientInitialValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <TypedInput name="full_name" type="text" label="Nom et prénom" placeholder="Nom et prénom du client" />
              <TypedInput name="email" type="email" label="Adresse e-mail" placeholder="Adresse e-mail du client" />
            </FormGroup>
            <FormGroup>
              <TypedInput name="address" type="text" label="Adresse" placeholder="Adresse du client" />
              <TypedInput
                name="phone"
                type="text"
                label="Numéro de téléphone"
                placeholder="Numéro de téléphone du client"
              />
            </FormGroup>
            <FormGroup>
              <TypedInput
                name="dzd_balance"
                type="number"
                label="Solde en dinars"
                placeholder="0"
                addOn="DA"
                disabled={isFormDisabled}
              />
              <TypedInput
                name="eur_balance"
                type="number"
                label="Solde en euros"
                placeholder="0"
                addOn="€"
                disabled={isFormDisabled}
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

export default ClientForm;
