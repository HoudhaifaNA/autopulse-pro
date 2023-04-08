import { Formik, FormikProps, FormikHelpers } from "formik";

import * as S from "components/CarForm/CarForm.styled";
import { TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import { Body1 } from "styles/Typography";
import Icon from "components/Icon/Icon";
import PlaceForm from "./PlaceForm";

interface Values {
  step: number;
  type: "locale" | "importé";
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
  type: "importé",
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
    actions.resetForm();
    actions.setFieldValue("step", values.step + 1);
  }, 1000);
};

const renderForm = (
  step: number,
  type: string,
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
) => {
  if (step === 1) {
    return <PlaceForm type={type} setFieldValue={setFieldValue} />;
  }
  if (step === 2) {
    return (
      <TypedInput
        name="carName"
        type="text"
        label="Voiture"
        placeholder="Nom du voiture"
      />
    );
  }
  if (step === 3) {
    return <h1>Step 3</h1>;
  }
};

const CarForm = () => {
  return (
    <Modal title="Ajouter un voiture">
      <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
        {({
          handleSubmit,
          submitForm,
          isSubmitting,
          setFieldValue,
          values,
        }: FormikProps<Values>) => {
          return (
            <>
              <ModalContent>
                <S.Form onSubmit={handleSubmit}>
                  {renderForm(values.step, values.type, setFieldValue)}

                  {/*  Hidden input to submit button with hitting enter  */}
                  <input type="submit" style={{ display: "none" }} />
                </S.Form>
              </ModalContent>
              <ModalActions>
                <Button
                  variant="ghost"
                  disabled={isSubmitting}
                  onClick={() => setFieldValue("step", values.step - 1)}
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
