import { createContext, ReactNode, useState } from "react";
import api from "../services/api";
import { setCookie } from "nookies";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  isAutheticated: boolean;
};

type SignInData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isAutheticated, setIsAuthenticated] = useState(false);

  async function signIn({ email, password }: SignInData) {
    const { data } = await api.post("/login", { email, password });

    const token = data.token;

    setCookie(undefined, "imobeflex.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
  }

  return (
    <AuthContext.Provider value={{ isAutheticated }}>
      {children}
    </AuthContext.Provider>
  );
}
