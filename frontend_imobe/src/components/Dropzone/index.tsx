import { memo, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./style.module.scss";
import cx from "classnames";
import { MdFileUpload } from "react-icons/md";
import { FileList } from "./FileList";
import { useSignUp } from "../../hooks/useSignUp";

const Dropzone = () => {
  const { handleFiles, files } = useSignUp();

  const { getInputProps, getRootProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: ["image/jpeg", "image/png", "image/jpg", "image/pjpeg"],
      noKeyboard: false,
      onDrop: (acceptedFiles) => handleFiles(acceptedFiles),
      maxFiles: 5,
    });

  console.log(files);
  return (
    <div className={styles.dropzone_container}>
      <div
        {...getRootProps()}
        className={cx(styles.dropzone, {
          [styles.drop_accept]: isDragAccept,
          [styles.drop_invalid]: isDragReject,
        })}
      >
        <input {...getInputProps()} />

        <MdFileUpload size={55} color="#49e299" />
        <h3>Adicione as imagens do seu imóvel aqui!</h3>
        <span>Clique ou arraste a imagem até aqui</span>
      </div>
      <FileList files={files} />
    </div>
  );
};

export default memo(Dropzone);
