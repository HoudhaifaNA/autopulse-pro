import { useEffect, useState } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";

import * as S from "components/CarForm/CarForm.styled";
import PlaceForm from "components/CarForm/PlaceForm";
import { carSchemaStep3 } from "Schemas/FormSchemas";
import { setFieldValue } from "components/CarForm/types";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import { TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
interface Values {
  step: number;
  carType: "locale" | "importé";
  brand: string;
  serie: string;
  model: string;
  serialNumber: string;
  registerIdentity: string;
  color: string;
  year: string;
  seller: string;
  boughtPrice: number;
  euroPrice: number;
  lisence: string;
  depenses: {
    type: "locale" | "À l'étranger";
    raison: string;
    cost: number;
  }[];
}

const INITIAL_VALUES: Values = {
  step: 1,
  carType: "importé",
  brand: "",
  serie: "",
  model: "",
  serialNumber: "",
  registerIdentity: "",
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
  carType: string,
  setFieldValue: setFieldValue
) => {
  if (step === 1) {
    return <PlaceForm carType={carType} setFieldValue={setFieldValue} />;
  }
  if (step === 2) {
    return (
      <TypedInput
        name="brand"
        type="text"
        label="SR"
        placeholder="Nom du voiture"
      />
    );
  }
  if (step === 3) {
    return (
      <TypedInput
        name="serialNumber"
        type="text"
        label="Voiture"
        placeholder="Nom du voiture"
      />
    );
  }
};

const CarForm = () => {
  const [step, setStep] = useState(1);

  let schems;
  if (step === 3) schems = carSchemaStep3;

  return (
    <Modal title="Ajouter un voiture">
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

          useEffect(() => {
            setStep(step);
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
                  Annuler
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
