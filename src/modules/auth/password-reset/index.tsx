import { Api } from "modules/common/api";
import { AuthForm } from "modules/common/components/auth-form";
import { useAuth } from "modules/common/contexts/auth-context";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

type PasswordResetParam = {
  token: string;
};

function PasswordReset() {
  const { token } = useParams<PasswordResetParam>();
  const api = Api.getInstance();
  const { resetPwd, setError } = useAuth();
  const history = useHistory();

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const initialValues = {
    password: "",
  };
  const successFn = async (values: { password: string }) => {
    const user = await api.resetPwd({
      newPassword: values.password,
      token: token,
    });
    resetPwd(user);
    history.push("/");
  };
  const errorFn = async (error: {
    response: { data: { message: string } };
  }) => {
    setError({ message: error.response.data.message });
  };
  return (
    <AuthForm
      title="Reset Password"
      validationSchema={validationSchema}
      initialValues={initialValues}
      successFn={successFn}
      errorFn={errorFn}
    />
  );
}
export { PasswordReset };
