import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { Api } from "modules/common/api";
import { useAuth } from "modules/common/contexts/auth-context";
import { AuthForm } from "modules/common/components/auth-form";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
function Login() {
  const api = Api.getInstance();
  const { login, setError } = useAuth();
  const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };
  async function successFn(values: { email: string; password: string }) {
    const user = await api.login({ ...values });
    login(user);
    history.push("/");
  }

  function errorFn(error: any) {
    setError({ message: error.response.data.message });
  }

  return (
    <AuthForm
      title="Sign In"
      validationSchema={validationSchema}
      initialValues={initialValues}
      successFn={successFn}
      errorFn={errorFn}
      linkPwdForgot
      linkSignUp
    />
  );
}
export { Login };
