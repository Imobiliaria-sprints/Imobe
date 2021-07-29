import Image from "next/image";
import { ReactNode } from "react";
import styles from "./style.module.scss";

type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <Image height={60} width={210} src="/icons/logo.svg" alt="Logomarca" />
      <nav>{children}</nav>
    </div>
  );
}
