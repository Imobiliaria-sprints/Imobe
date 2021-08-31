/* eslint-disable @next/next/no-img-element */
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/pages/signIn.module.scss";

export default function SingIn(props) {
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm();

  async function handleSignIn(data) {
    try {
      await signIn(data);
    } catch (error) {
      toast.error(`Ops 😬, E-mail ou senha inválidos`);
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
          <div className={styles.input_block}>
            <label>Email</label>
            <div>
              <input
                {...register("email")}
                id="email"
                name="email"
                placeholder="Digite seu melhor e-mail"
                autoComplete="email"
                required
                type="email"
              />

              <img src="/icons/email.svg" alt="email-icon" />
            </div>
          </div>
          <div className={styles.input_block}>
            <label>Senha</label>
            <div>
              <input
                {...register("password")}
                id="password"
                name="password"
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                type="password"
              />

              <img src="/icons/password.svg" alt="password-icon" />
            </div>
          </div>
          <div className={styles.input_block}>
            <span>
              Esqueceu sua senha? <a>Clique aqui</a>
            </span>
          </div>

          <button type="submit">Acessar</button>
        </form>
      </section>
    </div>
  );
}
