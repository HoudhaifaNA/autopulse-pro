import Image from "next/image";
import { Formik, FormikProps, FormikHelpers } from "formik";
import * as S from "styles/LoginPage.styled";
import { Heading3 } from "styles/Typography";
import { TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import { useState } from "react";

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

const LoginPage = () => {
  const [visiblity, setVisibility] = useState(false);

  return (
    <S.Home>
      <S.Main>
        <S.FormHeading>
          <Image
            src="/images/logo.png"
            alt="zauto logo"
            width={50}
            height={50}
          />
          <Heading3>Se connecter</Heading3>
        </S.FormHeading>
        <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
          {({ handleSubmit, isSubmitting }: FormikProps<Values>) => {
            return (
              <S.LoginForm onSubmit={handleSubmit}>
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
              </S.LoginForm>
            );
          }}
        </Formik>
      </S.Main>
    </S.Home>
  );
};

export default LoginPage;
