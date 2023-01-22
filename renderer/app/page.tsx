"use client";
import { Heading1 } from "styles/Typography";
import { Formik, FormikProps, FormikHelpers } from "formik";
import { Checkbox, TextInput } from "components/FormElements/Inputs";
import Button from "components/Buttons/Button";

interface Values {
  name: string;
  tos: string;
  password: string;
}

const initalValues = { name: "", password: "", tos: "pos" };
const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  console.log(values);
  actions.resetForm();
};

const validate = (values: Values) => {
  if (values.name.length < 6)
    return { name: "Name should be more than 6 char" };
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
        {(props: FormikProps<Values>) => {
          return (
            <form onSubmit={props.handleSubmit} style={{ width: "804px" }}>
              <div style={{ width: "350px" }}>
                <TextInput
                  name="name"
                  type="text"
                  iconRight="search"
                  label="Email address"
                  placeholder="Enter your email"
                />
              </div>
              <div style={{ width: "350px" }}>
                <TextInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                />
              </div>

              <Checkbox name="tos" type="radio" value="tos" label="ToS" />
              <Checkbox name="tos" type="radio" value="pos" label="Pos" />
              <button type="submit">Submit</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
