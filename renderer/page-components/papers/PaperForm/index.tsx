import { useEffect } from "react";
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

import { INITIAL_VALUES, TYPE_ITEMS } from "./constants";
import { handleSubmit } from "./handleSubmit";
import { paperSchema } from "./schema";
import useClientsList from "hooks/useClientsList";
import { addModal, removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { PaperInitalValues } from "./types";
import { ModalFormConfig } from "types";
import useSoldCarsList from "hooks/useSoldCarsList";
import TextArea from "components/TextArea";

const PaperForm = ({ modalId }: { modalId: string }) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.papers);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();

  const { clientsList, isLoading: isClientsLoading } = useClientsList();
  const { carsList, isLoading: carsLoading } = useSoldCarsList();

  let formInitialValues = INITIAL_VALUES;
  let submitButtonText = "Ajouter";

  if (currentModal.params?.isEdit) {
    formInitialValues = currentModal.params?.document as PaperInitalValues;
    submitButtonText = "Modifier";
  }

  const toggleClientForm = () => dispatch(addModal({ name: "clients", title: "Ajouter un client" }));

  const formProps: FormikConfig<PaperInitalValues> = {
    initialValues: formInitialValues,
    validationSchema: paperSchema,
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
      {({ setFieldValue, values, handleSubmit, isSubmitting }: FormikProps<PaperInitalValues>) => {
        useEffect(() => {
          if (values.purchased_at) {
            setFieldValue("type", "cart grise");
          } else {
            setFieldValue("type", "dossier");
          }
        }, [values.purchased_at]);

        useEffect(() => {
          if (currentModal.params?.isEdit) {
            const { owner } = currentModal.params?.document as PaperInitalValues;
            setFieldValue("owner", owner);
          }
        }, []);

        return (
          <Form onSubmit={handleSubmit}>
            <ScrollFormWrapper>
              <FormGroup>
                {!carsLoading && (
                  <SelectInput
                    name="car"
                    label="Voiture"
                    placeholder="Nom de voiture"
                    relatedFields={["car_id", null, "owner"]}
                    items={carsList}
                  />
                )}
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
                <TypedInput name="owner" type="text" label="Propriétaire" placeholder="Propriétaire" />
                <TypedInput name="price" type="number" label="Prix" placeholder="0" addOn="DA" />
              </FormGroup>
              <FormGroup>
                <DateInput name="given_at" label="Date donnée" />
                <DateInput name="purchased_at" label="Date de réception" clearable />
              </FormGroup>
              <FormGroup>
                <SelectInput
                  label="Type :"
                  placeholder="Choisissez un type"
                  name="type"
                  items={TYPE_ITEMS}
                  elementAs="div"
                />
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

export default PaperForm;
