/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import {
  MdHome,
  MdExitToApp,
  MdSort,
  MdDashboard,
  MdAdd, MdList,
} from "react-icons/md";
import styles from "./style.module.scss";
import Modal from "react-modal";
import { destroyCookie } from "nookies";
import Router from "next/router";
import { useState } from "react";
import cx from "classnames";
import { modalCustomStyles } from "../../utils/ModalStyleConf";
import { useAuth } from "../../hooks/useAuth";
import { Option } from "./option";

export function Sidebar() {
  const [isSidebarActive, setIsSidebarActive] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [load, setLoad] = useState(false);

  const { user } = useAuth();

  function handleModalOpen(): void {
    return setIsActive(!isActive);
  }
  function handleSidebarOpen() {
    return setIsSidebarActive(!isSidebarActive);
  }

  function exitToApp() {
    destroyCookie(null, "imobeflex.token");

    Router.push("/");
  }

  return (
    <aside
      className={cx(styles.menuIsActive, {
        [styles.notActive]: isSidebarActive,
      })}
    >
      <div>
        <button className={styles.burger} onClick={handleSidebarOpen}>
          <MdSort color="#3B4A5B" style={{ width: 30, height: 30 }} />
        </button>
        <div>
          {isSidebarActive ? (
            <Image
              width={50}
              height={50}
              src="/icons/miniLogo.svg"
              alt="Mini logo"
            />
          ) : (
            <Image width={170} height={50} src="/icons/logo.svg" alt="logo" />
          )}
        </div>
        <nav className={styles.menu}>
          <Option
            icon={
              <MdDashboard color="#3B4A5B" style={{ width: 30, height: 30 }} />
            }
            sidebarIsActive={isSidebarActive}
            name="Dashboard"
            path="dashboard"
          />
          <Option
            icon={
              <MdHome color="#3B4A5B" style={{ width: 30, height: 30 }} />
            }
            name="Meus Anúncios"
            sidebarIsActive={isSidebarActive}
            path="user/my-announcements"
          />
          <Option icon={
            <MdList color="#3B4A5B" style={{ width: 30, height: 30 }} />
          } name="Anúncios" sidebarIsActive={isSidebarActive} path={"announcements"} />
          <Option
            icon={<MdAdd color="#0ea490" style={{ width: 30, height: 30 }} />}
            name="Criar anúncio"
            sidebarIsActive={isSidebarActive}
            path="user/address"
          />
        </nav>
      </div>
      <section
        className={cx(styles.user_info_active, {
          [styles.user_info_not_active]: isSidebarActive,
        })}
      >
        <div>
          <img src={user?.avatar} alt={user?.name} style={{opacity: load ? 1 : 0}} onLoad={() => setLoad(true)}/>
          <div>
            <h3>{user?.name}</h3>
            <p>Bem vindo</p>
          </div>
        </div>
        <button onClick={handleModalOpen}>
          <MdExitToApp color="#7a7878" style={{ width: 25, height: 25 }} />
        </button>
      </section>
      <Modal
          isOpen={isActive}
          style={modalCustomStyles}
          onRequestClose={handleModalOpen}
          contentLabel="Exit to app Modal"
      >
        <div className={styles.exitToApp}>
          <h2>Você tem certeza que deseja sair?</h2>
          <button type="button" onClick={handleModalOpen}>
            Não
          </button>
          <button type="button" onClick={exitToApp}>
            Sim
          </button>
        </div>
      </Modal>
    </aside>
  );
}
