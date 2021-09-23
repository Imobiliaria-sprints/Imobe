import { memo, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./style.module.scss";
import cx from "classnames";
import { MdFileUpload } from "react-icons/md";

const Dropzone = () => {
  const [files, setFiles] = useState([]);

  const { getInputProps, getRootProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: ["image/jpeg", "image/png", "image/jpg", "image/pjpeg"],
      noKeyboard: false,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
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
      <section className={styles.file_list}>
        {files.map((file) => {
          return (
            <div key={file.name}>
              <img src={file.preview} alt={file.name} />
              <section>
                <span>{file.name}</span>
                <span>{file.size}</span>
              </section>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default memo(Dropzone);
