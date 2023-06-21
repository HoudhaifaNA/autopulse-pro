import { useContext, useState } from "react";
import { Formik, FormikHelpers, FormikProps } from "formik";

import * as S from "components/UpdateUserForm/UpdateUserForm.styled";
import { Heading3, Body2 } from "styles/Typography";

import TypedInput from "components/Input/TypedInput";
import Button from "components/Button/Button";

import { updateUsername, updateUserPassword } from "Schemas/FormSchemas";

import { Values, PasswordInputProps } from "components/UpdateUserForm/types";
import API from "utils/API";
import { GlobalContext } from "pages/_app";

const INITIAL_VALUES: Values = {
  username: "Saber Zehani",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setNotification: any
) => {
  const { currentPassword, newPassword } = values;
  try {
    await API.patch("/users/updateMe", {
      currPassword: currentPassword,
      newPassword,
    });
    setNotification({
      status: "success",
      message: "Mot de passe mis à jour avec succès",
    });
    actions.resetForm({});
  } catch (err: any) {
    setNotification({ status: "error", message: err.response.data.message });
  }
};

const PasswordInput = ({ label, name, placeholder }: PasswordInputProps) => {
  const [visiblity, setVisibility] = useState(false);

  const inputType = visiblity ? "text" : "password";
  const icon = visiblity ? "visibility_off" : "visibility";
  const togglePassword = () => setVisibility(!visiblity);

  return (
    <TypedInput
      label={label}
      name={name}
      placeholder={placeholder}
      type={inputType}
      rightIcon={icon}
      onIconClick={togglePassword}
    />
  );
};

const UpdateUserForm = ({ username }: { username: string }) => {
  const { setNotification } = useContext(GlobalContext);
  const [passwordChange, setPasswordChange] = useState(false);

  let formSchema = updateUsername;
  if (passwordChange) formSchema = updateUsername.concat(updateUserPassword);

  return (
    <S.FormWrapper>
      <Heading3>Paramètres du compte</Heading3>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={formSchema}
        onSubmit={(values, actions) =>
          onSubmit(values, actions, setNotification)
        }
      >
        {({ handleSubmit, isSubmitting }: FormikProps<Values>) => {
          return (
            <S.Form onSubmit={handleSubmit}>
              <TypedInput
                label="Nom"
                name="username"
                placeholder="Entrez votre nom"
                as="div"
              >
                {username}
              </TypedInput>
              {passwordChange && (
                <>
                  <PasswordInput
                    label="Mot de passe actuel"
                    name="currentPassword"
                    placeholder="Entrez votre mot de pass"
                  />
                  <PasswordInput
                    name="newPassword"
                    label="Nouveau mot de passe"
                    placeholder="Entrez un nouveau mot de passe"
                  />
                  <PasswordInput
                    name="confirmPassword"
                    label="Confirmez le mot de passe"
                    placeholder="Confirmer le nouveau mot de passe"
                  />
                </>
              )}

              <Button
                type="submit"
                variant="primary"
                width="100%"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Modifier
              </Button>
              <Body2
                className="form_toggle"
                onClick={() => setPasswordChange(!passwordChange)}
              >
                {passwordChange
                  ? "Changez juste le nom"
                  : "Changer le mot de passe"}
              </Body2>
            </S.Form>
          );
        }}
      </Formik>
    </S.FormWrapper>
  );
};

export default UpdateUserForm;
