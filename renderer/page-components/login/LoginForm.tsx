import { useState } from "react";
import { Formik, FormikProps } from "formik";

import * as S from "./styles";

import { TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { handleSubmit } from "./handleSubmit";
import { loginSchema } from "./schema";
import { UserCredentials } from "./types";

const INITIAL_VALUES: UserCredentials = { username: "", password: "" };

const LoginForm = () => {
  const [visibility, toggleVisibility] = useState(false);

  const formProps = {
    initialValues: INITIAL_VALUES,
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<UserCredentials>) => {
        return (
          <S.Form onSubmit={handleSubmit}>
            <TypedInput name="username" type="text" label="Nom" placeholder="Entrez votre nom" autoFocus />
            <TypedInput
              name="password"
              type={visibility ? "text" : "password"}
              label="Mot de passe"
              placeholder="Entrez votre mot de pass"
              rightIcon={visibility ? "visibility_off" : "visibility"}
              onIconClick={() => toggleVisibility(!visibility)}
            />
            <Button type="submit" variant="primary" width="100%" loading={isSubmitting} disabled={isSubmitting}>
              Se connecter
            </Button>
          </S.Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
