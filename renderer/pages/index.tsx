import { Formik, FormikProps, FormikHelpers } from "formik";

import { Heading1 } from "styles/Typography";
import Button from "components/Buttons/Button";
import { TypedInput } from "components/Input/Input";

interface Values {
  name: string;
  tos: boolean;
  password: string;
  favs: string;
}

const initalValues = { name: "", password: "", tos: false, favs: "coffe" };
const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.resetForm();
  }, 2000);
};

const validate = (values: Values) => {
  if (values.password.length < 6)
    return { password: "Name should be more than 6 char" };
  if (!values.tos) return { tos: "ToS should be pos" };
};
const LoginPage = () => {
  return (
    <div style={{ padding: "4rem" }}>
      <Heading1>Login Page</Heading1>
      <Formik
        initialValues={initalValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        {({ isSubmitting, handleSubmit }: FormikProps<Values>) => {
          return (
            <form onSubmit={handleSubmit} style={{ width: "304px" }}>
              <div style={{ width: "100%", marginTop: "2rem" }}>
                <TypedInput
                  name="name"
                  type="text"
                  label="name"
                  placeholder="Enter your name"
                  addOn="+213"
                />
              </div>

              <div style={{ width: "100%", marginTop: "2rem" }}>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  icon="success"
                >
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
