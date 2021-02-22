import React, { ReactNode, useReducer } from "react";
import { User } from "../models/user";
import { Error } from "../models/error";
import { useSnackbar } from "notistack";
type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

const INIT_STATE: AuthState = {
  isLoggedIn: false,
  user: null,
};

type Action =
  | { type: "register"; payload: User }
  | { type: "login"; payload: User }
  | { type: "logout" };

type AuthContextProps = AuthState & {
  register: (value: User) => void;
  login: (value: User, showSnackBar?: boolean) => void;
  resetPwd: (value: User) => void;
  logout: () => void;
  setError: (value: Error) => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  user: null,
  register: (value: User) => {},
  login: (value: User, showSnackBar?: boolean) => {},
  resetPwd: (value: User) => {},
  logout: () => {},
  setError: (value: Error) => {},
});

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "register":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
type AuthProviderProps = {
  children: ReactNode;
};
function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const register = (user: User) => {
    enqueueSnackbar("Succesfully registered", { variant: "success" });

    dispatch({
      type: "register",
      payload: user,
    });
  };
  const login = (user: User, showSnackBar: boolean = true) => {
    if (showSnackBar) {
      enqueueSnackbar("Succesfully logged in", { variant: "success" });
    }

    dispatch({
      type: "login",
      payload: user,
    });
  };
  const resetPwd = (user: User, showSnackBar: boolean = true) => {
    if (showSnackBar) {
      enqueueSnackbar("Password changed!", { variant: "success" });
    }

    dispatch({
      type: "login",
      payload: user,
    });
  };

  const logout = () => dispatch({ type: "logout" });

  const setError = (error: Error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register: register,
        login: login,
        logout: logout,
        setError: setError,
        resetPwd: resetPwd,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
export { AuthProvider, useAuth };
