import { useDispatch } from "react-redux";
import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";
import Form from "components/Form/Form";
import { TypedInput } from "components/Input/Input";
import DateInput from "components/DateInput/DateInput";
import { ModalActions } from "components/Modal/Modal";
import Button from "components/Button/Button";

import { useAppSelector } from "store";
import { ModalFormConfig } from "types";
import { ExpenseIntitalValues } from "./types";
import dateToString from "utils/dateToString";
import { removeModal } from "store/reducers/modals";
import handleSubmit from "./handleSubmit";
import { expenseSchema } from "./schema";

const INITIAL_VALUES: ExpenseIntitalValues = {
  expense_date: dateToString(new Date()),
  raison: "",
  cost: 0,
};

const ExpenseForm = ({ modalId }: { modalId: string }) => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.expenses);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();

  let formInitialValues = INITIAL_VALUES;
  let submitButtonText = "Ajouter";

  if (currentModal.params?.isEdit) {
    formInitialValues = currentModal.params?.document as ExpenseIntitalValues;
    submitButtonText = "Modifier";
  }

  const formProps: FormikConfig<ExpenseIntitalValues> = {
    initialValues: formInitialValues,
    validationSchema: expenseSchema,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, currentModal.params);
      if (status === "success") {
        mutate(fetchedUrl);
        dispatch(removeModal(modalId));
      }
    },
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<ExpenseIntitalValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <DateInput name="expense_date" label="Date de dépense" />
            </FormGroup>
            <FormGroup>
              <TypedInput name="raison" type="text" label="Raison" placeholder="Acheter une imprimante" />
              <TypedInput name="cost" type="number" label="Montant" placeholder="15000" addOn="DA" />
            </FormGroup>

            <ModalActions>
              <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
                {submitButtonText}
              </Button>
            </ModalActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ExpenseForm;
