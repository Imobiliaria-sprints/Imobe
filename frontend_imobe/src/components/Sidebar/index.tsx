import Image from "next/image";
import { useModal } from "../../hooks/useModal";
import { MdHome, MdFavorite, MdExitToApp, MdAdd } from "react-icons/md";
import styles from "./style.module.scss";
export function Sidebar() {
  const { isActive, handleModalOpen } = useModal();

  return (
    <aside className={styles.sidebarContainer}>
      <div>
        <div onClick={handleModalOpen}>
          {isActive ? (
            <Image width={170} height={50} src="/icons/logo.svg" alt="logo" />
          ) : (
            <Image
              width={50}
              height={50}
              src="/icons/miniLogo.svg"
              alt="Mini logo"
            />
          )}
        </div>
        <nav className={styles.menu}>
          <div>
            <MdHome color="#3B4A5B" style={{ width: 30, height: 30 }} />
            {isActive ? <span>Início</span> : ""}
          </div>
          <div>
            <MdFavorite color="#3B4A5B" style={{ width: 30, height: 30 }} />
            {isActive ? <span>Favoritos</span> : ""}
          </div>
          <div>
            <MdExitToApp color="#ED394F" style={{ width: 30, height: 30 }} />
            {isActive ? <span>Sair</span> : ""}
          </div>
        </nav>
      </div>
      <section>
        <button>
          <MdAdd color="#ffff" style={{ width: 30, height: 30 }} />{" "}
          {isActive ? <span>Criar anúncio</span> : ""}
        </button>
      </section>
    </aside>
  );
}
