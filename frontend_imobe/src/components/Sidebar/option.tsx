import { useState } from "react";
import { IconType } from "react-icons";
import styles from "./option.module.scss";
import cx from "classnames";
type OptionProps = {
  icon: JSX.Element | IconType;
  name: string;
  sidebarIsActive: boolean;
  current?: boolean;
};

export function Option({ name, icon, sidebarIsActive, current }: OptionProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={cx(styles.option_container, {
        [styles.isActive]: current,
      })}
    >
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
