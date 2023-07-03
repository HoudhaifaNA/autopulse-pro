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
  edit?: boolean;
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

const Actions = ({ step, buttonProps, edit }: ActionsProps) => {
  const { isSubmitting, setFieldValue, submitForm } = buttonProps;
  const canGoToPreviousStep = (edit && step > 2) || (!edit && step > 1);

  return (
    <>
      {canGoToPreviousStep && (
        <Button
          variant="ghost"
          disabled={isSubmitting}
          onClick={() => {
            setFieldValue && setFieldValue("step", step - 1);
          }}
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

const CarForm = ({ edit, data }: { edit?: boolean; data: any }) => {
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const [title, setTitle] = useState("Ajouter un voiture");

  const values = formProps?.values ?? INITIAL_VALUES;
  const { step, brand, model } = values;
  let intials = INITIAL_VALUES;
  let validation = [];
  validation[2] = carSchemaStepTwo;
  validation[4] = carSchemaStepFour;
  validation[5] = carSchemaStepFive;

  if (edit) intials = { step: 2, ...data, edit };

  // reset all inputs "touched" to false when step changes
  useEffect(() => {
    formProps?.setTouched({});
    if (step === 1) setTitle("Ajouter un voiture");
    if (step === 3) setTitle(`${brand} ${model}`);
  }, [step]);

  return (
    <Form
      title={title}
      initials={intials}
      validation={validation[step]}
      onSubmit={onSubmit}
      getFormProps={(formProps) => setFormProps(formProps)}
      Actions={(props) => (
        <Actions step={step} buttonProps={props} edit={edit} />
      )}
    >
      {renderForm(step)}
    </Form>
  );
};

export default CarForm;
