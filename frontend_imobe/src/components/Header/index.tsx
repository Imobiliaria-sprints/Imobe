/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import styles from "./style.module.scss";
import { MdExpandMore as ArrowDown, MdHome } from "react-icons/md";
import { FaUserAlt as UserIcon } from "react-icons/fa";
import Dropdown from "../Dropdown";
import { useRouter } from "next/router";

export function Header() {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);

  const router = useRouter();

  return (
    <div
      className={styles.headerContainer}
      onMouseLeave={() => setDropdownIsActive(false)}
    >
      <div onClick={() => router.push("/")}>
        <img src="/icons/logo.svg" alt="Logomarca" draggable="false" />
      </div>
      <nav
        className={styles.navContainer}
        onMouseEnter={() => setDropdownIsActive(true)}
      >
        <div className={styles.userInfo}>
          <section>
            <UserIcon size="18" color="#294461" />
            <span>Conta</span>
          </section>
          <ArrowDown size="18" color="#294461" />
        </div>
        {dropdownIsActive && (
          <Dropdown>
            <button onClick={() => router.push("/sign-in")}>Entrar</button>
            <div>
              <MdHome size="25" color="#294461" />
              <span>Ver meu anúncios</span>
            </div>
            <div>Acessar a minha conta</div>
            <div>Acessar a minha conta</div>
          </Dropdown>
        )}
      </nav>
    </div>
  );
}
