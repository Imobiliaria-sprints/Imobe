/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import styles from "../styles/pages/signIn.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../components/Input";

const signInForm = yup.object().shape({
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup.string().required("Password é obrigatório"),
});

export default function SingIn(props) {
  const { signIn } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInForm),
  });

  const { errors } = formState;

  async function handleSignIn(data) {
    try {
      await signIn(data);
    } catch (error) {
      toast.error(`E-mail ou senha inválidos`);
    }
  }

  return (
    <div className={styles.container_sign_in}>
      <Toaster />
      <section>
        <img src="/icons/logo.svg" alt="Logo" />
        <h1>Acesse sua conta na Imobe Flex</h1>

        <form
          onSubmit={handleSubmit(handleSignIn)}
          className={styles.form_container}
        >
          <Input
            label="email"
            type="email"
            name="email"
            error={errors.email}
            {...register("email")}
          />

          <Input
            label="password"
            type="password"
            name="password"
            error={errors.password}
            {...register("password")}
          />

          <div className={styles.input_block}>
            <span>
              Esqueceu sua senha? <a>Clique aqui</a>
            </span>
          </div>

          <button type="submit">
            {formState.isSubmitting ? (
              <Image
                height="20"
                width="20"
                src="/icons/loading.svg"
                alt="loading"
              />
            ) : (
              "Acessar"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
