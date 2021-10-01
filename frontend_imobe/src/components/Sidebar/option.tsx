import { HTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import styles from "./option.module.scss";
import cx from "classnames";

interface OptionProps extends HTMLAttributes<HTMLDivElement> {
  icon: JSX.Element | IconType;
  name: string;
  sidebarIsActive: boolean;
  current?: boolean;
}

export function Option({
  name,
  icon,
  sidebarIsActive,
  current,
  ...rest
}: OptionProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={cx(styles.option_container, {
        [styles.isActive]: current,
      })}
      {...rest}
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
