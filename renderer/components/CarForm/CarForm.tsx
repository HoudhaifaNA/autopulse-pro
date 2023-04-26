import { useEffect, useState } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";

import { Form } from "components/ui/Form.styled";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import PlaceForm from "components/CarForm/PlaceForm";
import CarDetailsForm from "components/CarForm/CarDetails";
import SellingDetails from "components/CarForm/SellingDetails";
import Expenses from "components/CarForm/Expenses";
import { setFieldValue, Values } from "components/CarForm/types";
import Button from "components/Buttons/Button";
import { carSchemaStepTwo } from "Schemas/FormSchemas";
import uid from "utils/uniqid";

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
  expenses: [
    {
      id: uid(),
      type: "À l'étranger",
      raison: "",
      euroCost: 0,
      euroPrice: 0,
    },
  ],
};

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.setSubmitting(false);
    actions.setFieldValue("step", values.step + 1);
  }, 1000);
};

const renderForm = (values: Values, setFieldValue: setFieldValue) => {
  const { step, carType, expenses } = values;
  if (step === 1) {
    return <PlaceForm carType={carType} setFieldValue={setFieldValue} />;
  }
  if (step === 2) {
    return <CarDetailsForm />;
  }
  if (step === 3) {
    return <SellingDetails carType={carType} />;
  }
  if (step === 4) {
    return <Expenses expenses={expenses} setFieldValue={setFieldValue} />;
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

          const { step, brand, serie, model } = values;

          // reset all inputs "touched" to false when step changes
          useEffect(() => {
            setStep(step);
            props.setTouched({});
            // !TODO -- Make a utility function to form car name
            if (step === 3) setTitle(`${brand} ${serie} ${model}`);
          }, [step]);

          return (
            <>
              <ModalContent>
                <Form onSubmit={handleSubmit}>
                  {renderForm(values, setFieldValue)}

                  {/*  Hidden input to submit button with hitting enter  */}
                  <input type="submit" style={{ display: "none" }} />
                </Form>
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
