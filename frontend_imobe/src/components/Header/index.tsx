/* eslint-disable @next/next/no-img-element */
import { ReactNode, useState } from "react";
import styles from "./style.module.scss";
import { MdExpandMore as ArrowDown, MdFavorite, MdHome } from "react-icons/md";
import { FaUserAlt as UserIcon } from "react-icons/fa";
import Dropdown from "../Dropdown";
import { useRouter } from "next/router";
import { Search } from "../Search";

export function Header() {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);

  const router = useRouter();

  return (
    <div className={styles.headerContainer}>
      <header>
        <div onClick={() => router.push("/")} className={styles.contain_logo}>
          <img src="/icons/logo.svg" alt="Logomarca" draggable="false" />
        </div>
        <Search />
        <nav
          className={styles.navContainer}
          onMouseEnter={() => setDropdownIsActive(true)}
          onMouseLeave={() => setDropdownIsActive(false)}
        >
          <div className={styles.userInfo}>
            <section>
              <UserIcon size="15" color="#474747" />
              <span>Conta</span>
            </section>
            <ArrowDown size="18" color="#474747" />
          </div>
          {dropdownIsActive && (
            <Dropdown>
              <button onClick={() => router.push("/auth/sign-in")}>
                Entrar
              </button>
              <div onClick={() => router.push("/user/my-announcements")}>
                <MdHome size="25" color="#294461" />
                <span>Ver meu anúncios</span>
              </div>
            </Dropdown>
          )}
        </nav>
      </header>
    </div>
  );
}
