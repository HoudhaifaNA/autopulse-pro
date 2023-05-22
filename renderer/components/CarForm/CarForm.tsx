import { useEffect, useState } from "react";
import { Formik, FormikProps } from "formik";

import { Form } from "components/ui/Form.styled";

import CarType from "components/CarForm/CarType";
import CarDetails from "components/CarForm/CarDetails";
import SellingDetails from "components/CarForm/SellingDetails";
import ExpenseDetails from "components/CarForm/ExpensesDetails";
import ConfirmationDetails from "components/CarForm/ConfirmationDetails";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import Button from "components/Button/Button";

import { INITIAL_VALUES } from "components/CarForm/constants";
import onSubmit from "components/CarForm/handleSubmit";
import {
  carSchemaStepTwo,
  carSchemaStepThree,
  carSchemaStepFour,
} from "Schemas/FormSchemas";

import { Values } from "components/CarForm/types";

const renderForm = (values: Values) => {
  const { step, carType, expenses } = values;
  if (step === 1) {
    return <CarType carType={carType} />;
  }
  if (step === 2) {
    return <CarDetails />;
  }
  if (step === 3) {
    return <SellingDetails carType={carType} />;
  }
  if (step === 4) {
    return <ExpenseDetails expenses={expenses} />;
  }
  if (step === 5) {
    return <ConfirmationDetails values={values} />;
  }
};

const CarForm = () => {
  const [currentStep, setStep] = useState(1);
  const [title, setTitle] = useState("Ajouter un voiture");

  let validation = [carSchemaStepTwo, carSchemaStepThree, carSchemaStepFour];

  return (
    <Modal title={title}>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validation[currentStep - 2]}
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
            if (step === 1) setTitle("Ajouter un voiture");
            if (step === 3) setTitle(`${brand} ${serie} ${model}`);
          }, [step]);

          return (
            <>
              <ModalContent>
                <Form onSubmit={handleSubmit}>
                  {renderForm(values)}
                  {/*  Hidden input to submit button with hitting enter  */}
                  <input type="submit" style={{ display: "none" }} />
                </Form>
              </ModalContent>
              <ModalActions>
                <Button
                  variant="ghost"
                  disabled={isSubmitting}
                  onClick={() => step !== 1 && setFieldValue("step", step - 1)}
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
                  {step === 5 ? "Confirmer" : "Suivant"}
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
