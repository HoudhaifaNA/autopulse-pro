import { Formik, FormikProps, FormikHelpers } from "formik";

import * as S from "components/ClientForm/ClientForm.styled";
import { TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import { ClientSchema } from "schemas/FormSchema";
import Modal from "components/Modal/Modal";

interface Values {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  debt: number;
}

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  debt: 0,
};

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.resetForm();
  }, 2000);
};

const ClientForm = () => {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={ClientSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, submitForm }: FormikProps<Values>) => {
        const Actions = (
          <>
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
              onClick={submitForm}
            >
              Ajouter
            </Button>
          </>
        );
        return (
          <Modal title="Ajouter un client" actionsComponent={Actions}>
            <S.Form
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitForm();
                }
              }}
            >
              <S.FormRow>
                <TypedInput
                  name="firstName"
                  type="text"
                  label="Prénom"
                  placeholder="Prénom du client"
                />
                <TypedInput
                  name="lastName"
                  type="text"
                  label="Nom"
                  placeholder="Nom du client"
                />
              </S.FormRow>
              <S.FormRow>
                <TypedInput
                  name="phoneNumber"
                  type="tel"
                  label="Numéro de téléphone"
                  placeholder="Numéro de téléphone du client"
                />
                <TypedInput
                  name="debt"
                  type="number"
                  label="Dette"
                  placeholder="Dette"
                  addOn="DZD"
                />
              </S.FormRow>
            </S.Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default ClientForm;
