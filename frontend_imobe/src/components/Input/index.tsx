import { InputHTMLAttributes, ReactNode } from "react";

import styles from "./style.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  children: ReactNode;
}

export function Input({ name, children, ...rest }: InputProps) {
  return (
    <div className={styles.input_block}>
      <label>{name}</label>
      <div>
        <input {...rest} />
        {children}
      </div>
    </div>
  );
}
