/* eslint-disable @next/next/no-img-element */
import styles from "./style.module.scss";

type FileListProps = {
  files: Files[];
};

interface Files extends File {
  id: string;
  preview: string;
}

export function FileList({ files }: FileListProps) {
  return (
    <section className={styles.file_list}>
      {files.map((file) => {
        return (
          <div key={file.id}>
            <img src={file.preview} alt={file.name} />
            <span>{file.name}</span>
            <span>{}</span>
          </div>
        );
      })}
    </section>
  );
}
