import { Formik, FormikProps, FormikHelpers } from "formik";

import { Form, FormContent, FormGroup } from "components/ui/Form.styled";

import DateInput from "components/FinanceForm/DateInput";
import TransactionType from "components/FinanceForm/TransactionType";
import { TypedInput, SelectInput } from "components/Input/Input";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import Button from "components/Button/Button";

import { INITIAL_VALUES, METHOD_ITEMS } from "components/FinanceForm/constants";
import { transactionSchema } from "Schemas/FormSchemas";

import { Values } from "components/FinanceForm/types";

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log("Value:", values);
    actions.resetForm();
  }, 1000);
};

const TransactionForm = () => {
  return (
    <Modal title="Effectuer une transaction">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={transactionSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<Values>) => {
          const { handleSubmit, submitForm, isSubmitting } = props;

          return (
            <>
              <ModalContent>
                <Form onSubmit={handleSubmit}>
                  <FormContent>
                    <FormGroup>
                      <DateInput />
                      <SelectInput
                        label="Client :"
                        placeholder="Entrez le nom"
                        name="client"
                        items={[]}
                      />
                    </FormGroup>
                    <FormGroup>
                      <SelectInput
                        label="Méthode :"
                        placeholder="Choisissez une méthode"
                        name="method"
                        items={METHOD_ITEMS}
                        elementAs="div"
                      />
                      <TypedInput
                        name="amount"
                        type="number"
                        label="Montant :"
                        placeholder="150000.00"
                        addOn="DZD"
                      />
                    </FormGroup>
                    <FormGroup>
                      <TransactionType />
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

export default TransactionForm;
