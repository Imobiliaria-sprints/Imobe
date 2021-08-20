import Image from "next/image";
import { MdHome, MdFavorite, MdExitToApp, MdAdd } from "react-icons/md";
import styles from "./style.module.scss";
import Modal from "react-modal";
import { destroyCookie } from "nookies";
import Router from "next/router";
import { useState } from "react";
import cx from "classnames";
import { modalCustomStyles } from "../../utils/ModalStyleConf";

export function Sidebar() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
    <aside className={styles.sidebarContainer}>
      <div className={cx(styles.menuIsActive, { active: isSidebarActive })}>
        <div onClick={handleSidebarOpen}>
          <Image width={170} height={50} src="/icons/logo.svg" alt="logo" />
          <span>
            <Image
              width={50}
              height={50}
              src="/icons/miniLogo.svg"
              alt="Mini logo"
            />
          </span>
        </div>
        <nav className={styles.menu}>
          <div>
            <MdHome color="#3B4A5B" style={{ width: 30, height: 30 }} />
            <span>Início</span>
          </div>
          <div>
            <MdFavorite color="#3B4A5B" style={{ width: 30, height: 30 }} />
            <span>Favoritos</span>
          </div>
          <div onClick={handleModalOpen}>
            <MdExitToApp color="#ff4365" style={{ width: 30, height: 30 }} />
            <span>Sair</span>
          </div>
        </nav>
      </div>
      <section>
        <button>
          <MdAdd color="#ffff" style={{ width: 30, height: 30 }} />{" "}
          <span>Criar anúncio</span>
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
