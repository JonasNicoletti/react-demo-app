import React, { ReactNode, useReducer } from "react";
type AuthState = {
    isLoggedIn: boolean,
    accessToken: String | null,
    refreshToken: String | null
}

const INIT_STATE: AuthState = {
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null
}

type UserLoginType = {
    username: String,
    password: String
}

type Action =
    | { type: 'register' }
    | { type: 'login', payload: UserLoginType }
    | { type: 'logout' }

type AuthContextProps =
    | AuthState
    | {
        register: Function,
        login: Function,
        logout: Function
    }

const AuthContext = React.createContext<AuthContextProps>({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    register: () => { },
    login: (username: String, password: String) => { },
    logout: () => { }
});

const reducer = (state: AuthState, action: Action): AuthState => {
    switch (action.type) {
        case 'register':
            return {
                ...state
            };
        case 'login':
            return {
                ...state,
                isLoggedIn: true,
                accessToken: 'accessToken',
                refreshToken: 'refreshToken'
            };
        case 'logout':
            return {
                ...state,
                isLoggedIn: false,
                accessToken: null,
                refreshToken: null
            };
        default:
            return state;
    }
}
function AuthProvider( children : ReactNode) {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const register = () => { };
    const login = (username: String, password: String) => dispatch({ type: 'login', payload: { username: username, password: password } });
    const logout = () => dispatch({ type: 'logout' });

    return <AuthContext.Provider value={{ ...state, register: register, login: login, logout: logout }} >
        {children}
        </AuthContext.Provider>
};

function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
export { AuthProvider, useAuth }

