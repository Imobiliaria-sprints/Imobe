import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "../components/Input";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../services/api";
import { v4 as uuid } from "uuid";
import styles from "../styles/pages/signUp.module.scss";
import { useDropzone } from "react-dropzone";
import { MdAdd } from "react-icons/md";
import cx from "classnames";
import { useState } from "react";

interface Files extends File {
  id: string;
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
  const route = useRouter();
  const [files, setFiles] = useState<Files[]>([]);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpForm),
  });

  const { errors } = formState;

  function handleFile(files_accept: File[]) {
    const uploadedFiles = files_accept.map((file) =>
      Object.assign(file, {
        id: uuid(),
        preview: URL.createObjectURL(file),
      })
    );

    if (files.length > 1) {
      return;
    }
    setFiles(uploadedFiles);
  }

  const {
    getInputProps,
    getRootProps,

    acceptedFiles,
  } = useDropzone({
    accept: ["image/jpeg", "image/png", "image/jpg", "image/pjpeg"],
    noKeyboard: false,
    onDrop: (acceptedFiles) => handleFile(acceptedFiles),
    maxFiles: 1,
  });

  async function handleSignUp(user) {
    try {
      const data = new FormData();

      data.append("name", user.name);
      data.append("phone", user.phone);
      files.map((file) => {
        data.append("avatar", file);
      });
      data.append("email", user.email);
      data.append("password", user.password);

      await api.post("users", data);

      toast.success(`Conta criada com sucesso`);

      route.push("/sign-in");
    } catch (error) {
      toast.error(`E-mail ou senha inválidos`);
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
                [styles.is_accept]: files.length > 0,
              })}
            >
              <input {...getInputProps()} />
              {acceptedFiles.length !== 0 ? (
                files.map((file) => (
                  <img key={file.id} src={file.preview} alt={file.name} />
                ))
              ) : (
                <MdAdd size="40" color="#bdbdbd" />
              )}
            </div>
            <span>
              {files.map((file) => (
                <p key={file.id}>{file.name}</p>
              ))}
            </span>
            <label>Escolha sua foto de perfil</label>
          </div>
          <Input
            label="name"
            type="name"
            name="name"
            error={errors.name}
            {...register("name")}
          />

          <Input
            label="phone"
            type="phone"
            name="phone"
            error={errors.phone}
            {...register("phone")}
          />
          <Input
            label="email"
            type="email"
            name="email"
            error={errors.email}
            {...register("email")}
          />

          <Input
            label="password"
            type="password"
            name="password"
            error={errors.password}
            {...register("password")}
          />

          <div className={styles.input_block}>
            <span>
              Já tenho conta{" "}
              <a onClick={() => route.push("/sign-in")}>Clique aqui</a>
            </span>
          </div>

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
