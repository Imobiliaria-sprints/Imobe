import { memo, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./style.module.scss";
import cx from "classnames";
import { MdFileUpload } from "react-icons/md";
import { FileList } from "./FileList";
import { v4 as uuid } from "uuid";

interface Files extends File {
  id: string;
  preview: string;
}

const Dropzone = () => {
  const [files, setFiles] = useState<Files[]>([]);

  function handleFiles(files_accept: File[]) {
    const uploadedFiles = files_accept.map((file) =>
      Object.assign(file, {
        id: uuid(),
        preview: URL.createObjectURL(file),
      })
    );
    if (files.length >= 5) {
      return;
    }
    setFiles(files.concat(uploadedFiles));
  }

  console.log(files);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: ["image/jpeg", "image/png", "image/jpg", "image/pjpeg"],
    noKeyboard: false,
    onDrop: (acceptedFiles) => handleFiles(acceptedFiles),
    maxFiles: 5,
  });

  useEffect(() => {});

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
