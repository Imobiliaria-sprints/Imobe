import { useState } from "react";
import { IconType } from "react-icons";
import styles from "./option.module.scss";

type OptionProps = {
  icon: JSX.Element | IconType;
  name: string;
  sidebarIsActive: boolean;
};

export function Option({ name, icon, sidebarIsActive }: OptionProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.option_container}>
      <div
        className={styles.option}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        {icon}
        <span>{name}</span>
      </div>
      {isActive && sidebarIsActive && (
        <div className={styles.option_dropdown}>
          <p>{name}</p>
        </div>
      )}
    </div>
  );
}
