import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Api } from "modules/common/api";
import { useAuth } from "modules/common/contexts/auth-context";
import React from "react";
import { AuthForm } from "modules/common/components/auth-form";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup
    .string()
    .min(4, "Username should be of minimum 4 characters length")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function Registration() {
  const api = Api.getInstance();
  const { register, setError } = useAuth();
  const history = useHistory();
  const initialValues = {
    email: "",
    name: "",
    password: "",
  };
  async function successFn(values: {
    email: string;
    name: string;
    password: string;
  }) {
    const newUser = await api.register({ ...values });
    register(newUser);
    history.push("/");
  }
  const errorFn = async (error: {
    response: { data: { message: string } };
  }) => {
    setError({ message: error.response.data.message });
  };

  return (
    <AuthForm
      title="Register"
      validationSchema={validationSchema}
      initialValues={initialValues}
      successFn={successFn}
      errorFn={errorFn}
      linkSignIn
    />
  );
}
export { Registration };
