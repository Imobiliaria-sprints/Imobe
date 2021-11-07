/* eslint-disable @next/next/no-img-element */
import {memo, ReactNode, useState} from "react";
import styles from "./style.module.scss";
import {MdDashboard, MdExpandMore as ArrowDown, MdFavorite, MdHome} from "react-icons/md";
import { FaUserAlt as UserIcon } from "react-icons/fa";
import Dropdown from "../Dropdown";
import { useRouter } from "next/router";
import { Search } from "../Search";
import {parseCookies} from "nookies";
import {useAuth} from "../../hooks/useAuth";

export function Header() {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const { ["imobeflex.token"]: token } = parseCookies();

  const {user} = useAuth();


  return (
    <div className={styles.headerContainer}>
      <header>
        <div onClick={() => router.push("/")} className={styles.contain_logo}>
          <img src="/icons/logo.svg" alt="Logomarca" draggable="false" />
        </div>
        <nav
          className={styles.navContainer}
          onMouseEnter={() => setDropdownIsActive(true)}
          onMouseLeave={() => setDropdownIsActive(false)}
        >
          {!!token ? (
              <div>
                <section>
                  <img src={user?.avatar} alt={user?.name} style={{opacity: load ? 1 : 0, width: 30, height: 30}} onLoad={() => setLoad(true)}/>
                  <span>{user?.name}</span>
                </section>
              </div>
          ) : (
              <div className={styles.userInfo}>
                <section>
                  <UserIcon size="15" color="#474747" />
                  <span>Conta</span>
                </section>
                <ArrowDown size="18" color="#474747" />
              </div>
            )
          }
          {dropdownIsActive && (
            <Dropdown>
              {
               !token && (
                   <button onClick={() => router.push("/auth/sign-in")}>
                     Entrar
                   </button>
               )
              }
              {
                !!token && (
                    <>
                    <div onClick={() => router.push("/dashboard")}>
                      <MdDashboard size="25" color="#294461" />
                      <span>Dashboard</span>
                    </div>
                    <div onClick={() => router.push("/user/my-announcements")}>
                      <MdHome size="25" color="#294461" />
                      <span>Ver meu anúncios</span>
                    </div>
                    </>
                )
              }
            </Dropdown>
          )}
        </nav>
      </header>
    </div>
  );
}

