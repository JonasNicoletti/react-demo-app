import { Api } from "modules/common/api";
import { useAuth } from "modules/common/contexts/auth-context";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { AuthForm } from "modules/common/components/auth-form";

function PasswordForgot() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
  });
  const api = Api.getInstance();
  const { setError } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const initialValues = {
    email: "",
  };
  const successFn = async (values: { email: string }) => {
    await api.forgotPassword({ email: values.email });
    enqueueSnackbar("Check your inbox!", { variant: "info" });
  };
  const errorFn = async (error: {
    response: { data: { message: string } };
  }) => {
    setError({ message: error.response.data.message });
  };

  return (
    <AuthForm
      title="Password forgot"
      validationSchema={validationSchema}
      initialValues={initialValues}
      successFn={successFn}
      errorFn={errorFn}
      linkSignUp
    />
  );
}

export { PasswordForgot };
