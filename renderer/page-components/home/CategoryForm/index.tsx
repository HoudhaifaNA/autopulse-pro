import { mutate } from "swr";
import { Formik, FormikConfig, FormikProps } from "formik";
import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import Form from "components/Form/Form";
import { FormGroup } from "components/Form/Form.styled";
import TypedInput from "components/Input/TypedInput";
import { ModalActions } from "components/Modal/Modal";

import { INITIAL_VALUES } from "./constants";
import { schemaCategory } from "./schema";
import { handleSubmit } from "./handleSubmit";
import { CategoryInitalValues } from "./types";
import { removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { ModalFormConfig } from "types";

interface CategoryFormProps {
  modalId: string;
}

const CategoryForm = ({ modalId }: CategoryFormProps) => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.categories);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as ModalFormConfig;
  const dispatch = useDispatch();

  let formInitialValues = INITIAL_VALUES;
  let submitButtonText = "Ajouter";

  if (currentModal.params?.isEdit) {
    formInitialValues = currentModal.params?.document as CategoryInitalValues;
    submitButtonText = "Modifier";
  }

  const formProps: FormikConfig<CategoryInitalValues> = {
    initialValues: formInitialValues,
    validationSchema: schemaCategory,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, currentModal.params);
      console.log(values);

      if (status === "success") {
        mutate(fetchedUrl);
        mutate("/categories/cars");
        dispatch(removeModal(modalId));
      }
    },
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<CategoryInitalValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <TypedInput type="text" name="name" label="Nom" placeholder="Nom du category" />
            </FormGroup>

            <ModalActions>
              <Button type="submit" variant="primary" loading={isSubmitting}>
                {submitButtonText}
              </Button>
            </ModalActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CategoryForm;
