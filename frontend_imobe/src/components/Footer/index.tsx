import Image from "next/image";
import { Topic } from "./topic";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import styles from "./style.module.scss";
import { MdSend } from "react-icons/md";

export function Footer() {
  return (
    <div className={styles.footer_container}>
      <footer>
        <div className={styles.contain_logo}>
          <Image height="60" width="200" src="/icons/logo.svg" alt="logomark" />
        </div>
          <div className={styles.content_topic}>
            <Topic name="Sobre o Projeto">
              <li>Projeto Interdisciplinar</li>
              <li>Cruzeiro do Sul</li>
              <li>Imobiliária</li>
            </Topic>
            <Topic name="Política">
              <li>Política de privacidade</li>
              <li>Sobre nós</li>
            </Topic>
          </div>
        <div className={styles.send_notification}>
          <span>Quer receber as novidades da Imobe?</span>
          <section>
            <input placeholder="Digite seu melhor email" />
            <button>
              <MdSend color="#fff" size="20" />
            </button>
          </section>
          <section>
            <div>
              <FaFacebookF color="#fff" size="20" />
            </div>
            <div>
              <FaInstagram color="#fff" size="20" />
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
}
