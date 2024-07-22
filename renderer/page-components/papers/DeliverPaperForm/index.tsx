import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";
import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import DateInput from "components/DateInput/DateInput";
import Form from "components/Form/Form";
import { FormGroup, ScrollFormWrapper } from "components/Form/Form.styled";
import TypedInput from "components/Input/TypedInput";
import { ModalActions } from "components/Modal/Modal";

import { INITIAL_VALUES } from "./constants";
import { handleSubmit } from "./handleSubmit";
import { deliverPaperSchema } from "./schema";
import { removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { DeliverPaperInitalValues } from "./types";
import { ModalFormConfig } from "types";
import TextArea from "components/TextArea";

const DeliverPaperForm = ({ modalId }: { modalId: string }) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.papers);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();

  const documentValues = currentModal.params?.document;
  let submitButtonText = "Livrer";

  let formInitialValues = { ...INITIAL_VALUES, ...documentValues };

  if (currentModal.params?.isEdit) {
    formInitialValues = documentValues as DeliverPaperInitalValues;
  }

  const formProps: FormikConfig<DeliverPaperInitalValues> = {
    initialValues: formInitialValues,
    validationSchema: deliverPaperSchema,
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
      {({ handleSubmit, isSubmitting }: FormikProps<DeliverPaperInitalValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <ScrollFormWrapper>
              <FormGroup>
                <DateInput name="received_at" label="Date de livraison" />
                <TypedInput name="recipient" type="text" label="Destinataire" placeholder="Destinataire" />
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

export default DeliverPaperForm;
