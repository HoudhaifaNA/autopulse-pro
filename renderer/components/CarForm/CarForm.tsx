import { useEffect, useState } from "react";
import { FormikProps } from "formik";

import Form from "components/Form/Form";

import CarType from "components/CarForm/CarType";
import CarDetails from "components/CarForm/CarDetails";
import CarFeatures from "components/CarForm/CarFeatures";
import SellingDetails from "components/CarForm/SellingDetails";
import ExpenseDetails from "components/CarForm/ExpensesDetails";
import ConfirmationDetails from "components/CarForm/ConfirmationDetails";
import Button from "components/Button/Button";

import { INITIAL_VALUES } from "components/CarForm/constants";
import onSubmit from "components/CarForm/handleSubmit";
import {
  carSchemaStepTwo,
  carSchemaStepFour,
  carSchemaStepFive,
} from "Schemas/FormSchemas";

import { Values } from "components/CarForm/types";

interface ActionsProps {
  step: number;
  buttonProps: Partial<FormikProps<any>>;
}

const renderForm = (step: number) => {
  if (step === 1) {
    return <CarType />;
  }
  if (step === 2) {
    return <CarDetails />;
  }
  if (step === 3) {
    return <CarFeatures />;
  }
  if (step === 4) {
    return <SellingDetails />;
  }
  if (step === 5) {
    return <ExpenseDetails />;
  }
  if (step === 6) {
    return <ConfirmationDetails />;
  }
};

const Actions = ({ step, buttonProps }: ActionsProps) => {
  const { isSubmitting, setFieldValue, submitForm } = buttonProps;

  return (
    <>
      {step > 1 && (
        <Button
          variant="ghost"
          disabled={isSubmitting}
          onClick={() => setFieldValue && setFieldValue("step", step - 1)}
        >
          Retour
        </Button>
      )}

      <Button
        type="submit"
        variant="primary"
        loading={isSubmitting}
        disabled={isSubmitting}
        onClick={submitForm}
      >
        {step === 6 ? "Confirmer" : "Suivant"}
      </Button>
    </>
  );
};

const CarForm = () => {
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const [title, setTitle] = useState("Ajouter un voiture");

  const values = formProps?.values ?? INITIAL_VALUES;
  const { step, brand, model } = values;
  let validation;
  if (step === 2) validation = carSchemaStepTwo;
  if (step === 4) validation = carSchemaStepFour;
  if (step === 5) validation = carSchemaStepFive;

  // reset all inputs "touched" to false when step changes
  useEffect(() => {
    formProps?.setTouched({});
    if (step === 1) setTitle("Ajouter un voiture");
    if (step === 3) setTitle(`${brand} ${model}`);
  }, [step]);

  return (
    <Form
      title={title}
      initials={INITIAL_VALUES}
      validation={validation}
      onSubmit={onSubmit}
      getFormProps={(formProps) => setFormProps(formProps)}
      Actions={(props) => <Actions step={step} buttonProps={props} />}
    >
      {renderForm(step)}
    </Form>
  );
};

export default CarForm;
