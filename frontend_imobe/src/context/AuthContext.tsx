import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
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
  avatar: string;
};

type AuthContextData = {
  user: User;
  isAutheticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

/**
 * @Lucas-Duarte-dev
 */
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAutheticated = !!user;

  useEffect(() => {
    const { "imobeflex.token": token } = parseCookies();
    console.log(token);
    if (token) {
      api
        .get("/verify/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data));
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const {
      data: { token, user },
    } = await api.post("/login", { email, password });

    console.log({ token, user });

    setCookie(undefined, "imobeflex.token", token, {
      maxAge: 60 * 60 * 24 * 1, // 1 day
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
