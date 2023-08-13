import { ReactNode, useEffect, useContext } from "react";
import { Formik, FormikProps } from "formik";

import * as S from "components/Form/Form.styled";

import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import Button from "components/Button/Button";

import { GlobalContext } from "pages/_app";

type ActionsProps = Partial<FormikProps<any>>;

interface FormProps {
  title: string;
  initials: any;
  validation: any;
  onSubmit: any;
  getFormProps?: (props: FormikProps<any>) => void;
  Actions?: (props: ActionsProps) => JSX.Element;
  buttonText?: string;
  children: ReactNode;
}

const Form = (props: FormProps) => {
  const context = useContext(GlobalContext);

  const {
    title,
    initials,
    validation,
    onSubmit,
    getFormProps,
    Actions,
    buttonText,
    children,
  } = props;

  const FormikSetup = {
    initialValues: initials,
    validationSchema: validation,
    onSubmit: (actions: FormikProps<any>, values: any) =>
      onSubmit(actions, values, context),
  };

  return (
    <Modal title={title}>
      <Formik {...FormikSetup}>
        {(formProps: FormikProps<any>) => {
          const { handleSubmit, isSubmitting, submitForm } = formProps;

          useEffect(() => {
            if (getFormProps) getFormProps(formProps);
          }, [formProps.values]);

          return (
            <>
              <ModalContent>
                <S.Form onSubmit={handleSubmit}>
                  <S.FormContent>{children}</S.FormContent>
                  <input type="submit" style={{ display: "none" }} />
                </S.Form>
              </ModalContent>
              <ModalActions>
                {Actions ? (
                  <Actions
                    isSubmitting={isSubmitting}
                    submitForm={submitForm}
                    setFieldValue={formProps.setFieldValue}
                  />
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    {buttonText ?? "Ajouter"}
                  </Button>
                )}
              </ModalActions>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default Form;
