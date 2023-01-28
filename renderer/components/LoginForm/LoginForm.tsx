import { useState } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";

import * as S from "styles/LoginPage.styled";
import { TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import { LoginSchema } from "Schemas/FormSchema";

interface Values {
  username: string;
  password: string;
}

const INITIAL_VALUES = { username: "", password: "" };

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.resetForm();
  }, 2000);
};

const LoginForm = () => {
  const [visiblity, setVisibility] = useState(false);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={LoginSchema}
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
              iconRight={visiblity ? "visibility_off" : "visibility"}
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
