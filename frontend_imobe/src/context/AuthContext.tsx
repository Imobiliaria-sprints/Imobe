import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import toast from "react-hot-toast";

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

type SignUpData = {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  password: string;
};

type AuthContextData = {
  user: User | null;
  isAutheticated: boolean;
  validate: "null" | "low" | "medium" | "high";
  signUp: (user: SignUpData, files: File[]) => Promise<void>;
  signIn: (data: SignInData) => Promise<void>;
  validatePassword: (password: string) => void;
};

export const AuthContext = createContext({} as AuthContextData);

/**
 * @Lucas-Duarte-dev
 */
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [validate, setValidate] = useState<"null" | "low" | "medium" | "high">(
    "null"
  );

  const isAutheticated = !!user;

  useEffect(() => {
    const { "imobeflex.token": token } = parseCookies();
    console.log(token);
    if (token) {
      api
        .get("users/verify/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data));
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const {
      data: { token, user },
    } = await api.post("auth/session", { email, password });

    console.log({ token, user });

    setCookie(undefined, "imobeflex.token", token, {
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/dashboard");
  }

  async function signUp(user: SignUpData, files: File[]) {
    const data = new FormData();

    data.append("name", user.name);
    data.append("phone", user.phone);
    files.map((file) => {
      data.append("avatar", file);
    });
    data.append("email", user.email);
    data.append("password", user.password);

    const response = await api.post("users", data);

    if (response.status === 200) {
      toast.success(`Conta criada com sucesso`);

      Router.push("/auth/sign-in");

      setValidate("null");
    }
  }

  function validatePassword(password: string) {
    const low_security = password.match(/^[A-Za-z0-9]\w{8,}$/);

    if (low_security) {
      setValidate("low");
    }

    const medium_security = password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    );

    if (medium_security) {
      setValidate("medium");
    }

    const high_security = password.match(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
    );

    if (high_security) {
      setValidate("high");
    }

    if (password.trim() === "") {
      setValidate("null");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAutheticated,
        signIn,
        validatePassword,
        validate,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
