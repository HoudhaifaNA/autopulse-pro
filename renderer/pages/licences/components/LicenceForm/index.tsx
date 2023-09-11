import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import Button from "components/Button/Button";
import DateInput from "components/DateInput/DateInput";
import Form from "components/Form/Form";
import { FormGroup } from "components/Form/Form.styled";
import SelectInput from "components/Input/SelectInput";
import TypedInput from "components/Input/TypedInput";
import Dropzone from "../Dropzone";
import AttachmentViewer from "../AttachmentViewer";
import { ModalActions } from "components/Modal/Modal";

import { INITIAL_VALUES, WILAYAS_ITEMS } from "./constants";
import licenceSchema from "./schema";
import handleSubmit from "./handleSubmit";
import { LicenceInitalValues } from "./types";
import useClientsList from "hooks/useClientsList";
import { addModal, removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { ModalFormConfig } from "types";

interface LicenceFormProps {
  modalId: string;
}

const renderAttachments = (attachments: LicenceInitalValues["attachments"]) => {
  if (attachments.length > 0) {
    return attachments.map((attachemnt) => {
      return <AttachmentViewer key={attachemnt.id} attachment={attachemnt} />;
    });
  }
};

const LicenceForm = ({ modalId }: LicenceFormProps) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.licences);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();
  const { clientsList, isLoading: isClientsLoading } = useClientsList();

  let formInitialValues = INITIAL_VALUES;
  let isFormDisabled = false;
  let submitButtonText = "Ajouter";

  if (currentModal.params?.isEdit) {
    formInitialValues = currentModal.params?.document as LicenceInitalValues;
    isFormDisabled = true;
    submitButtonText = "Modifier";
  }

  const toggleClientForm = () => dispatch(addModal({ name: "clients", title: "Ajouter un client" }));

  const formProps: FormikConfig<LicenceInitalValues> = {
    initialValues: formInitialValues,
    validationSchema: licenceSchema,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, currentModal.params);
      if (status === "success") {
        mutate(fetchedUrl);
        mutate(secondaryUrl);
        mutate("/licences/list/valid");
        dispatch(removeModal(modalId));
      }
    },
  };

  return (
    <Formik {...formProps}>
      {({ values, handleSubmit, isSubmitting }: FormikProps<LicenceInitalValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <TypedInput type="text" name="moudjahid" label="Moudjahid" placeholder="Nom du moudjahid" />
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
            </FormGroup>
            <FormGroup>
              <DateInput name="purchased_at" label="Date d'achat" minDate="2015" />
              <DateInput name="issue_date" label="Date d'émission" minDate="2015" />
            </FormGroup>
            <FormGroup>
              <TypedInput name="serial_number" label="Numéro de série" placeholder="420022" />
              <SelectInput
                name="wilaya"
                label="Wilaya"
                placeholder="Entrez la wilaya"
                items={WILAYAS_ITEMS}
                sorted={false}
              />
              <TypedInput name="price" type="number" label="Prix" placeholder="0" addOn="DA" />
            </FormGroup>
            <FormGroup>
              <Dropzone disabled={isFormDisabled} />
            </FormGroup>
            <S.DocumentsList>{renderAttachments(values.attachments)}</S.DocumentsList>
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

export default LicenceForm;
