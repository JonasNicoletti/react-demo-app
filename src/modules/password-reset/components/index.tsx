import { useParams } from "react-router-dom";

type PasswordResetParam = {
  token: string;
};

function PasswordReset() {
  const { token } = useParams<PasswordResetParam>();
  return <div>PasswordReset: {token}</div>;
}
export { PasswordReset };
