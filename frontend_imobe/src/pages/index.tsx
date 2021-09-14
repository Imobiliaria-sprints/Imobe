/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { Divisor } from "../components/Divisor";
import { Header } from "../components/Header";
import styles from "../styles/pages/home.module.scss";
import Modal from "react-modal";
import { useRouter } from "next/router";
import React from "react";
import { MdHome } from "react-icons/md";

export default function Home(props) {
  const router = useRouter();

  return (
    <div id={styles.home}>
      <Header />

      <section className={styles.section_apresentation}>
        <div>
          <h1>Encontre o lugar perfeito para você!</h1>
          <span>lorem ipsum dolar amet lorem ipsum dolar amet </span>
          <ul>
            <li>Agende sua visita ao seu imóvel favorito</li>
            <li>Divulgue seu imóvel</li>
            <li>Torne seu sonho realidade</li>
          </ul>
          <button onClick={() => router.push("/announcements")}>
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
      <section className={styles.alert_info}>
        <div>
          <MdHome size="28" color="#eb5b1d" />
          <span>
            Quer vender sua casa?
            <a>Clique aqui!</a>
          </span>
        </div>
      </section>

      <section>
        <div></div>
        <div></div>
      </section>
    </div>
  );
}
