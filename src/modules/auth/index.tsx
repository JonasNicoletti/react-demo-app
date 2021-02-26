import { Login } from "./login";
import { Registration } from "./registration";
import { PasswordForgot } from "./password-forgot";
import { PasswordReset } from "./password-reset";
import { Route } from "react-router-dom";

function Auth() {
  return (
    <>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Registration />
      </Route>
      <Route path="/password-forgot">
        <PasswordForgot />
      </Route>
      <Route path="/reset-password/:token">
        <PasswordReset />
      </Route>
    </>
  );
}

export { Auth };
