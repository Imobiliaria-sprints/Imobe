/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { ReactNode } from "react";
import styles from "./style.module.scss";

type HeaderProps = {
  children: ReactNode;
};

export function Header({ children }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <img src="/icons/logo.svg" alt="Logomarca" />
      <nav>{children}</nav>
    </div>
  );
}
