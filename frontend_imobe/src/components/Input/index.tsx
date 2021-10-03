import { forwardRef, InputHTMLAttributes } from "react";
import { ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";
import styles from "./input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  icon?: JSX.Element | IconType;
  mask?: (value: string) => string | boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    error = null,
    icon = null,
    mask = (value: string) => value,
    ...rest
  },
  ref
) => {
  return (
    <div className={styles.inputConstainer}>
      {!!label && <label htmlFor={name}>{label}</label>}
      <section id={!!icon && styles.with_icon}>
        {!!icon && icon}
        <input
          id={name}
          name={name}
          ref={ref}
          {...rest}
          onChange={(e) =>
            !!mask && (e.target.value = `${mask(e.target.value)}`)
          }
          className={!!error && styles.inputInvalid}
        />
      </section>
      {!!error && <span>{error.message}</span>}
    </div>
  );
};

export const Input = forwardRef(InputBase);
