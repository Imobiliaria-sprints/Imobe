import { ReactNode } from "react";
import styles from "./style.module.scss";

type DropdownProps = {
  children: ReactNode;
};

export default function Dropdown({ children }: DropdownProps) {
  return <div id={styles.dropdownItem}>{children}</div>;
}
