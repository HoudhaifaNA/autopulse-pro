import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";

import Form from "components/Form/Form";
import { ModalActions } from "components/Modal/Modal";
import Button from "components/Button/Button";
import CarType from "./CarType/CarType";
import CarDetails from "./CarDetails/CarDetails";
import CarAddtionalDetails from "./CarAddtionalDetails/CarAddtionalDetails";
import PurchaseDetails from "./PurchaseDetails/PurchaseDetails";
import ExpensesDetails from "./ExpensesDetails/ExpensesDetails";
import ConfirmationDetails from "./ConfirmationDetails/ConfirmationDetails";

import { useAppSelector } from "store";
import { ModalFormConfig } from "types";
import { removeModal } from "store/reducers/modals";
import { handleSubmit } from "./handleSubmit";
import { INITIAL_VALUES, SCHEMAS } from "./constants";
import { CarInitialValues } from "./types";

interface CarFormProps {
  modalId: string;
}

const CarForm = ({ modalId }: CarFormProps) => {
  const [step, setStep] = useState(1);
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.cars);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();
  const ownerId = useRef<number | null>(null);

  let formInitialValues = INITIAL_VALUES;
  let submitButtonText = "Suivant";

  if (currentModal.params?.document) {
    formInitialValues = currentModal.params?.document as CarInitialValues;
  }

  if (step === 6) {
    submitButtonText = "Ajouter";
  }

  if (currentModal.params?.isEdit && step === 6) {
    submitButtonText = "Modifier";
  }

  const formProps: FormikConfig<CarInitialValues> = {
    initialValues: formInitialValues,
    validationSchema: SCHEMAS[step],
    onSubmit: async (values, actions) => {
      if (step === 1 && currentModal.params?.isEdit) ownerId.current = values.owner_id;
      if (step < 6) {
        setStep((prevStep) => prevStep + 1);
        actions.setTouched({});
        actions.validateForm(values);
      } else if (step === 6) {
        const status = await handleSubmit(values, actions, currentModal.params);
        if (status === "success") {
          mutate(fetchedUrl);
          mutate(secondaryUrl);
          dispatch(removeModal(modalId));
        }
      }
    },
  };
  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting, isValid }: FormikProps<CarInitialValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            {step === 1 && <CarType isEdit={currentModal.params?.isEdit} />}
            {step === 2 && <CarDetails />}
            {step === 3 && <CarAddtionalDetails />}
            {step === 4 && <PurchaseDetails isEdit={currentModal.params?.isEdit} ownerId={ownerId.current} />}
            {step === 5 && <ExpensesDetails />}
            {step === 6 && <ConfirmationDetails />}

            <ModalActions>
              {step > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep((prevStep) => prevStep - 1)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Retour
                </Button>
              )}
              {currentModal.params?.isEdit && step < 6 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => isValid && setStep(6)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Confirmer
                </Button>
              )}
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

export default CarForm;
