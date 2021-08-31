/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { Divisor } from "../components/Divisor";
import { Header } from "../components/Header";
import styles from "../styles/pages/home.module.scss";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { modalCustomStyles } from "../utils/ModalStyleConf";

export default function Home(props) {
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm();

  const [isActive, setIsActive] = useState(false);

  async function handleSignIn(data) {
    try {
      await signIn(data);
    } catch (error) {
      toast.error(`Ops 😬, E-mail ou senha inválidos`);
    }
  }

  function handleModalOpen(): void {
    return setIsActive(!isActive);
  }

  return (
    <div id={styles.home}>
      <Toaster />
      <Header>
        <a>Entre em contato</a>
        <a onClick={handleModalOpen}>Entre em sua conta</a>
        <button>Faça sua conta</button>
      </Header>

      <section className={styles.section_apresentation}>
        <div>
          <h1>Encontre o lugar perfeito para você!</h1>
          <span>lorem ipsum dolar amet lorem ipsum dolar amet </span>
          <ul>
            <li>Agende sua visita ao seu imóvel favorito</li>
            <li>Divulgue seu imóvel</li>
            <li>Torne seu sonho realidade</li>
          </ul>
          <button>
            <img src="/icons/house.svg" alt="house icons" />
            Ver imóveis
          </button>
          <Divisor />
        </div>
        <div>
          <img
            src="/img/houses.png"
            alt="Apresentation Imobeflex"
            draggable="false"
          />
        </div>
      </section>
      <Modal
        isOpen={isActive}
        style={modalCustomStyles}
        onRequestClose={handleModalOpen}
        contentLabel="Login Modal"
      >
        <div className={styles.form_container}>
          <h1>Entre na sua conta</h1>
          <form onSubmit={handleSubmit(handleSignIn)}>
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
              <label>Email</label>
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

            <button type="submit">Acessar</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
