import { useState } from "react";
import { Formik, FormikProps } from "formik";

import * as S from "./styles";

import { TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { handleSubmit } from "./handleSubmit";
import { changePasswordSchema } from "./schema";
import { UpdatePasswordInitialValues } from "./types";

const INITIAL_VALUES: UpdatePasswordInitialValues = {
  current_password: "",
  new_password: "",
};

const UpdatePasswordForm = () => {
  const [currentPassVisibility, toggleCurrentPassVisibility] = useState(false);
  const [newPassvisibility, toggleNewPassVisibility] = useState(false);

  const formProps = {
    initialValues: INITIAL_VALUES,
    validationSchema: changePasswordSchema,
    onSubmit: handleSubmit,
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<UpdatePasswordInitialValues>) => {
        return (
          <S.Form onSubmit={handleSubmit}>
            <TypedInput
              name="current_password"
              type={currentPassVisibility ? "text" : "password"}
              label="Mot de passe"
              placeholder="Entrez votre mot de pass"
              rightIcon={currentPassVisibility ? "visibility_off" : "visibility"}
              onIconClick={() => toggleCurrentPassVisibility(!currentPassVisibility)}
            />
            <TypedInput
              name="new_password"
              type={newPassvisibility ? "text" : "password"}
              label="Nouveau mot de passe"
              placeholder="Entrez votre mot de pass"
              rightIcon={newPassvisibility ? "visibility_off" : "visibility"}
              onIconClick={() => toggleNewPassVisibility(!newPassvisibility)}
            />
            <Button type="submit" variant="primary" width="100%" loading={isSubmitting} disabled={isSubmitting}>
              Changer le mot de passe
            </Button>
          </S.Form>
        );
      }}
    </Formik>
  );
};

export default UpdatePasswordForm;
