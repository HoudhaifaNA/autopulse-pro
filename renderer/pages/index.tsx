import { Heading1 } from "styles/Typography";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { Checkbox, TextInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import Toggle from "components/Toggle/Toggle";

interface Values {
  name: string;
  tos: boolean;
  password: string;
}

const initalValues = { name: "", password: "", tos: false };
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
            <form onSubmit={handleSubmit} style={{ width: "804px" }}>
              <div style={{ width: "350px", marginTop: "2rem" }}>
                <TextInput
                  name="name"
                  type="text"
                  label="name"
                  placeholder="Enter your name"
                  addOn="+213"
                />
              </div>
              <div style={{ width: "350px", marginTop: "2rem" }}>
                <TextInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  iconRight="visibility"
                />
              </div>
              <div style={{ width: "350px", marginTop: "2rem" }}>
                <Checkbox name="tos" type="checkbox" label="Terms of Service" />
              </div>

              <div style={{ width: "350px", marginTop: "2rem" }}>
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
      <div style={{ width: "350px", marginTop: "2rem" }}>
        <Toggle status={true} />
      </div>
      <div style={{ width: "350px", marginTop: "2rem" }}>
        <Toggle label={{ text: "Turn off", position: "left" }} status={false} />
      </div>
      <div style={{ width: "350px", marginTop: "2rem" }}>
        <Toggle
          label={{ text: "Change user look to blur", position: "right" }}
          disabled
        />
      </div>
    </div>
  );
};

export default LoginPage;
