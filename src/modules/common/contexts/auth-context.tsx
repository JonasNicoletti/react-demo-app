import React, { ReactNode, useReducer } from "react";
type AuthState = {
  isLoggedIn: boolean;
  accessToken: String | null;
  refreshToken: String | null;
};

const INIT_STATE: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

type UserLoginType = {
  username: String;
  password: String;
};
type UserRegisterType = UserLoginType & {
  name: String;
};

type Action =
  | { type: "register"; payload: UserRegisterType }
  | { type: "login"; payload: UserLoginType }
  | { type: "logout" };

type AuthContextProps = AuthState & {
  register: Function;
  login: Function;
  logout: Function;
};

const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  register: (value: UserRegisterType) => {},
  login: (username: String, password: String) => {},
  logout: () => {},
});

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "register":
      return {
        ...state,
        isLoggedIn: true,
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };
    case "login":
      return {
        ...state,
        isLoggedIn: true,
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null,
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

  const register = (value: UserRegisterType) =>
    dispatch({
      type: "register",
      payload: { ...value },
    });
  const login = (username: String, password: String) =>
    dispatch({
      type: "login",
      payload: { username: username, password: password },
    });
  const logout = () => dispatch({ type: "logout" });

  return (
    <AuthContext.Provider
      value={{ ...state, register: register, login: login, logout: logout }}
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
