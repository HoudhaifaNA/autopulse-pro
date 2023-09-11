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
import handleSubmit from "./handleSubmit";
import paperSchema from "./schema";
import useClientsList from "hooks/useClientsList";
import { addModal, removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { PaperInitalValues } from "./types";
import { ModalFormConfig } from "types";
import useCarsWithPaperList from "hooks/useCarsWithPaperList";

const PaperForm = ({ modalId }: { modalId: string }) => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.papers);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();
  const { carsList, isLoading: isCarsLoading } = useCarsWithPaperList();
  const { clientsList, isLoading: isClientsLoading } = useClientsList();

  let formInitialValues = INITIAL_VALUES;
  let isFormDisabled = false;
  let submitButtonText = "Ajouter";

  if (currentModal.params?.isEdit) {
    formInitialValues = currentModal.params?.document as PaperInitalValues;
    isFormDisabled = true;
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
        dispatch(removeModal(modalId));
      }
    },
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<PaperInitalValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              {!isCarsLoading && (
                <SelectInput
                  name="car"
                  label="Voiture"
                  placeholder="Nom de voiture"
                  relatedFields={["car_id"]}
                  items={carsList}
                  disabled={isFormDisabled}
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
              <DateInput name="purchased_at" label="Date de réception" />
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
              <TypedInput name="price" type="number" label="Prix" placeholder="0" addOn="DA" />
            </FormGroup>
            <FormGroup>
              <DateInput name="issue_date" label="Date d'émission" />
              <DateInput name="received_at" label="Date de livraison" clearable />
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

export default PaperForm;
