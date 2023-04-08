import { Formik, FormikProps, FormikHelpers } from "formik";

import * as S from "components/ClientForm/ClientForm.styled";
import { TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import { clientSchema } from "Schemas/FormSchemas";
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
  }, 1000);
};

const ClientForm = () => {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={clientSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, submitForm, isSubmitting }: FormikProps<Values>) => {
        return (
          <Modal title="Ajouter un client">
            <S.Form onSubmit={handleSubmit}>
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
              {/*Add hidden input to submit button with hitting enter */}
              <input type="submit" style={{ display: "none" }} />
            </S.Form>
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
          </Modal>
        );
      }}
    </Formik>
  );
};

export default ClientForm;
