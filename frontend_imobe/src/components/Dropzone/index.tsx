import { useDropzone } from "react-dropzone";
import styles from "./style.module.scss";
import cx from "classnames";
import { MdFileUpload } from "react-icons/md";
import { FileList } from "./FileList";
import { useDrop } from "../../hooks/useDrop";

export function Dropzone() {
  const { files, handleDeleteFile, handleFiles } = useDrop();

  const { getInputProps, getRootProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: ["image/jpeg", "image/png", "image/jpg", "image/pjpeg"],
      noKeyboard: false,
      onDrop: (acceptedFiles) => handleFiles(acceptedFiles),
      maxFiles: 5,
    });

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
      <FileList files={files} handleDeleteFile={handleDeleteFile} />
    </div>
  );
}
