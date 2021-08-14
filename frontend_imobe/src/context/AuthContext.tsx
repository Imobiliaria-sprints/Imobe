import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

type AuthContextProviderProps = {
  children: ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  phone: string;
  email: string;
};

type AuthContextData = {
  user: User;
  isAutheticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAutheticated = !!user;

  useEffect(() => {
    const { "imobeflex.token": token } = parseCookies();

    if (token) {
      api
        .get("/verify/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .then((data) => setUser(data.user));
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const {
      data: { token, user },
    } = await api.post("/login", { email, password });

    setCookie(undefined, "imobeflex.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/dashboard");
  }

  return (
    <AuthContext.Provider value={{ user, isAutheticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
