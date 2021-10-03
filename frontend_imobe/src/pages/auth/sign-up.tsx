/* eslint-disable @next/next/no-img-element */
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "../../components/Input";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import styles from "../../styles/pages/signUp.module.scss";
import { useDropzone } from "react-dropzone";
import { MdAdd } from "react-icons/md";
import cx from "classnames";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { phone } from "../../utils/InputMask";

interface Files extends File {
  preview: string;
}

const signUpForm = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup.string().required("Password é obrigatório"),
  avatar: yup.string(),
});

export default function SignUp(props) {
  const [files, setFiles] = useState<Files>();

  const { validatePassword, validate, signUp } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpForm),
  });

  const { errors } = formState;

  function handleFile(files_accept: File) {
    const uploadedFiles = Object.assign(files_accept, {
      preview: URL.createObjectURL(files_accept),
    });

    setFiles(uploadedFiles);
  }

  const {
    getInputProps,
    getRootProps,

    acceptedFiles,
  } = useDropzone({
    accept: ["image/jpeg", "image/png", "image/jpg", "image/pjpeg"],
    noKeyboard: false,
    onDrop: (acceptedFile) =>
      handleFile(acceptedFile.length !== 0 && acceptedFile[0]),
    maxFiles: 1,
  });

  async function handleSignUp(data) {
    try {
      await signUp(data, files);
    } catch (err) {
      toast.error("Houve um erro");
    }
  }

  return (
    <div className={styles.container_sign_up}>
      <Toaster />
      <section>
        <Image height="100" width="250" src="/icons/logo.svg" alt="Logo" />
        <h1>Crie sua conta na Imobe Flex</h1>

        <form
          onSubmit={handleSubmit(handleSignUp)}
          className={styles.form_container}
        >
          <div className={styles.input_file_container}>
            <div
              {...getRootProps()}
              className={cx(styles.input_file, {
                [styles.is_accept]: !!files,
              })}
            >
              <input {...getInputProps()} />
              {acceptedFiles.length !== 0 ? (
                <img src={files?.preview} alt={files?.name} />
              ) : (
                <MdAdd size="40" color="#bdbdbd" />
              )}
            </div>
            <span>
              <p>{files?.name}</p>
            </span>
            <label>Escolha sua foto de perfil</label>
          </div>
          <fieldset>
            <Input
              label="name"
              type="name"
              name="name"
              error={errors.name}
              {...register("name")}
            />

            <Input
              label="Número de tele"
              type="phone"
              name="phone"
              error={errors.phone}
              {...register("phone")}
              mask={phone}
            />
          </fieldset>
          <Input
            label="Email"
            type="email"
            name="email"
            error={errors.email}
            {...register("email")}
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            error={errors.password}
            {...register("password")}
          />
          {/* <div
            className={cx(styles.verify_password, {
              [styles.password_low]: validate === "low",
              [styles.password_medium]: validate === "medium",
              [styles.password_high]: validate === "high",
            })}
          >
            <div>{validate !== "null" && validate}</div>
          </div> */}

          <button type="submit">
            {formState.isSubmitting ? (
              <Image
                height="20"
                width="20"
                src="/icons/loading.svg"
                alt="loading"
              />
            ) : (
              "Próximo"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
