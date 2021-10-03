import { HTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import styles from "./option.module.scss";
import cx from "classnames";
import { useRouter } from "next/router";

interface OptionProps extends HTMLAttributes<HTMLDivElement> {
  icon: JSX.Element | IconType;
  name: string;
  sidebarIsActive: boolean;

  path: string;
}

export function Option({
  name,
  icon,
  sidebarIsActive,
  path,
  ...rest
}: OptionProps) {
  const [isActive, setIsActive] = useState(false);

  const { push, pathname } = useRouter();

  const isCurrentPath = pathname === `/${path}`;

  return (
    <div
      className={styles.option_container}
      {...rest}
      onClick={() => push(`/${path}`)}
    >
      <button
        className={cx(styles.option, {
          [styles.current_path]: isCurrentPath,
        })}
        disabled={isCurrentPath}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        {icon}
        <span>{name}</span>
      </button>
      {isActive && sidebarIsActive && (
        <div className={styles.option_dropdown}>
          <p>{name}</p>
        </div>
      )}
    </div>
  );
}
