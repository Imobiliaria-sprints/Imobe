/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Header } from "../components/Header";
import styles from "../styles/pages/home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <Header>
        <a>Entre em contato</a>
        <a>Entre em sua conta</a>
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
        </div>
        <div>
          <img
            src="/img/houses.png"
            alt="Apresentation Imobeflex"
            draggable="false"
          />
        </div>
      </section>
    </div>
  );
}
