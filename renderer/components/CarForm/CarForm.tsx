import { useEffect, useState } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";

import { setFieldValue, Values } from "components/CarForm/types";
import * as S from "components/CarForm/CarForm.styled";
import CarDetailsForm from "components/CarForm/CarDetails";
import PlaceForm from "components/CarForm/PlaceForm";
import { carSchemaStepTwo } from "Schemas/FormSchemas";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import Button from "components/Buttons/Button";
import SellingDetails from "./SellingDetails";

const INITIAL_VALUES: Values = {
  step: 1,
  carType: "importé",
  brand: "",
  serie: "",
  model: "",
  serialNumber: "",
  registrationNumber: "",
  color: "",
  year: "",
  seller: "",
  boughtPrice: 0,
  euroPrice: 0,
  lisence: "",
  depenses: [],
};

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.setSubmitting(false);
    actions.setFieldValue("step", values.step + 1);
  }, 1000);
};

const renderForm = (
  step: number,
  carType: Values["carType"],
  setFieldValue: setFieldValue
) => {
  if (step === 1) {
    return <PlaceForm carType={carType} setFieldValue={setFieldValue} />;
  }
  if (step === 2) {
    return <CarDetailsForm />;
  }
  if (step === 3) {
    return <SellingDetails carType={carType} />;
  }
};

const CarForm = () => {
  const [currentStep, setStep] = useState(1);
  const [title, setTitle] = useState("Ajouter un voiture");

  let schems;
  // if (currentStep === 2) schems = carSchemaStepTwo;

  return (
    <Modal title={title}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={schems}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<Values>) => {
          const {
            handleSubmit,
            submitForm,
            isSubmitting,
            setFieldValue,
            values,
          } = props;

          const { step, carType } = values;

          // Set all inputs touched to false when changing the step to hide errors when typing first time
          useEffect(() => {
            setStep(step);
            props.setTouched({});
            // !TODO -- Make a utility function to form car name
            if (step === 3)
              setTitle(`${values.brand} ${values.serie} ${values.model}`);
          }, [step]);

          return (
            <>
              <ModalContent>
                <S.Form onSubmit={handleSubmit}>
                  {renderForm(step, carType, setFieldValue)}

                  {/*  Hidden input to submit button with hitting enter  */}
                  <input type="submit" style={{ display: "none" }} />
                </S.Form>
              </ModalContent>
              <ModalActions>
                <Button
                  variant="ghost"
                  disabled={isSubmitting}
                  onClick={() => setFieldValue("step", step - 1)}
                >
                  {step === 1 ? "Annuler" : "Retour"}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Suivant
                </Button>
              </ModalActions>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default CarForm;
