/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Divisor } from "../components/Divisor";
import { Header } from "../components/Header";
import styles from "../styles/pages/home.module.scss";
import Modal from "react-modal";
import { useModal } from "../hooks/useModal";
import { Input } from "../components/Input";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

export default function Home(props) {
  const { modalCustomStyles, isActive, handleModalOpen } = useModal();

  return (
    <div id={styles.home}>
      <Header>
        <a>Entre em contato</a>
        <a>Entre em sua conta</a>
        <button onClick={handleModalOpen}>Faça sua conta</button>
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
          <h1>Crie uma conta</h1>
          <form>
            <Input name="Nome" placeholder="Digite seu nome">
              <img src="/icons/user.svg" alt="Full name" />
            </Input>
            <Input name="Telefone" placeholder="Digite seu número">
              <img src="/icons/phone.svg" alt="" />
            </Input>
            <Input name="Email" placeholder="Digite seu melhor e-mail">
              <img src="/icons/email.svg" alt="" />
            </Input>
            <Input name="Telefone" placeholder="Digite sua senha">
              <img src="/icons/password.svg" alt="" />
            </Input>
          </form>
        </div>
      </Modal>
    </div>
  );
}
