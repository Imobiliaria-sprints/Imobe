import { forwardRef, InputHTMLAttributes } from "react";
import { ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <div className={styles.inputConstainer}>
      {!!label && <label htmlFor={name}>{label}</label>}

      <input
        id={name}
        name={name}
        ref={ref}
        {...rest}
        className={!!error && styles.inputInvalid}
      />
      {!!error && <span>{error.message}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
