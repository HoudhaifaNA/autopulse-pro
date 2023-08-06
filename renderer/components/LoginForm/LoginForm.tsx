import { useContext, useState } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";

import * as S from "styles/LoginPage.styled";

import { TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";

import convertPath from "utils/convertPath";
import { loginSchema } from "Schemas/FormSchemas";
import API from "utils/API";
import { GlobalContext } from "pages/_app";

interface Values {
  username: string;
  password: string;
}

const INITIAL_VALUES = { username: "", password: "" };

const onSubmit = async (values: Values, ctx: any) => {
  const { setNotification } = ctx;
  const { username, password } = values;
  let message;

  try {
    await API.post("/users/login", { username, password });

    setNotification({ status: "success", message: "Connecté avec succès" });

    setTimeout(() => {
      location.assign(convertPath("cars"));
    }, 500);
  } catch (err: any) {
    console.log(err);
    message = "Error";
    if (err.response) message = err.response.data.message;
    setNotification({ status: "error", message });
  }
};

const LoginForm = () => {
  const ctx = useContext(GlobalContext);
  const [visiblity, setVisibility] = useState(false);

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={loginSchema}
      onSubmit={(values) => onSubmit(values, ctx)}
    >
      {({ handleSubmit, isSubmitting }: FormikProps<Values>) => {
        return (
          <S.Form onSubmit={handleSubmit}>
            <TypedInput
              name="username"
              type="text"
              label="Nom"
              placeholder="Entrez votre nom"
              autoFocus
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
