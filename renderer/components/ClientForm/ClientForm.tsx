import { Formik, FormikProps, FormikHelpers } from "formik";

import { Form, FormContent, FormGroup } from "components/ui/Form.styled";
import { TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import { clientSchema } from "Schemas/FormSchemas";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";

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
    <Modal title="Ajouter un client">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={clientSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, submitForm, isSubmitting }: FormikProps<Values>) => {
          return (
            <>
              <ModalContent>
                <Form onSubmit={handleSubmit}>
                  <FormContent>
                    <FormGroup>
                      <TypedInput
                        name="firstName"
                        type="text"
                        label="Prénom"
                        placeholder="Prénom du client"
                        autoFocus
                      />
                      <TypedInput
                        name="lastName"
                        type="text"
                        label="Nom"
                        placeholder="Nom du client"
                      />
                    </FormGroup>
                    <FormGroup>
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
                    </FormGroup>
                    {/*Add hidden input to submit button with hitting enter */}
                    <input type="submit" style={{ display: "none" }} />
                  </FormContent>
                </Form>
              </ModalContent>
              <ModalActions>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Ajouter
                </Button>
              </ModalActions>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default ClientForm;
