import { mutate } from "swr";
import { useDispatch } from "react-redux";
import { Formik, FormikConfig, FormikProps } from "formik";

import Form from "components/Form/Form";
import { FormGroup } from "components/Form/Form.styled";
import { TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";
import { ModalActions } from "components/Modal/Modal";

import { useAppSelector } from "store";
import { removeModal } from "store/reducers/modals";
import { clearSelectedItems } from "store/reducers/selectedItems";
import { handleSubmit } from "./handleSubmit";
import { schema } from "./schema";
import { ExchangeRateInitialValue } from "./types";

interface UpdateExchangeRateForm {
  modalId: string;
}

const INITIAL_VALUES: ExchangeRateInitialValue = {
  eur_exchange_rate: 0,
};

const UpdateExchangeRateForm = ({ modalId }: UpdateExchangeRateForm) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.cars);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();

  const formProps: FormikConfig<ExchangeRateInitialValue> = {
    initialValues: INITIAL_VALUES,
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, { ids: selectedIds.join(",") });
      if (status === "success") {
        mutate(fetchedUrl);
        mutate(secondaryUrl);
        dispatch(removeModal(modalId));
        dispatch(clearSelectedItems());
      }
    },
  };
  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<ExchangeRateInitialValue>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <TypedInput
                label="Taux de change 100 €"
                name="eur_exchange_rate"
                type="number"
                addOn="DA"
                placeholder="23000"
              />
            </FormGroup>
            <ModalActions>
              <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
                Modifier
              </Button>
            </ModalActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateExchangeRateForm;
