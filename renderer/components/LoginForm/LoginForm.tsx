import { useState } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";

import * as S from "styles/LoginPage.styled";

import { TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";

import convertPath from "utils/convertPath";
import { loginSchema } from "Schemas/FormSchemas";
import API from "utils/API";

interface Values {
  username: string;
  password: string;
}

const INITIAL_VALUES = { username: "", password: "" };

const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
  const { username, password } = values;
  try {
    await API.post("/users/login", { username, password });

    actions.resetForm();

    setTimeout(() => {
      location.assign(convertPath("dashboard"));
    }, 500);
  } catch (err: any) {
    console.log(err.response.data.message);
  }
};

const LoginForm = () => {
  const [visiblity, setVisibility] = useState(false);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={loginSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting }: FormikProps<Values>) => {
        return (
          <S.Form onSubmit={handleSubmit}>
            <TypedInput
              name="username"
              type="text"
              label="Nom"
              placeholder="Entrez votre nom"
            />
            <TypedInput
              name="password"
              type={visiblity ? "text" : "password"}
              label="Mot de passe"
              placeholder="Entrez votre mot de pass"
              rightIcon={visiblity ? "visibility_off" : "visibility"}
              onIconClick={() => setVisibility(!visiblity)}
            />
            <Button
              type="submit"
              variant="primary"
              width="100%"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Se connecter
            </Button>
          </S.Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
