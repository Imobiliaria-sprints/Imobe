/* eslint-disable @next/next/no-img-element */
import { memo } from "react";
import { MdDelete } from "react-icons/md";
import { useDropzone } from "../../hooks/useDropzone";
import styles from "./style.module.scss";

type FileListProps = {
  files: Files[];
};

interface Files extends File {
  id: string;
  preview: string;
}

export function FileListComponent({ files }: FileListProps) {
  const { handleDeleteFile } = useDropzone();

  return (
    <section className={styles.file_list}>
      {files.map((file) => {
        return (
          <div key={file.id}>
            <img src={file.preview} alt={file.name} />
            <section>
              <span>{file.name}</span>
              <span>{file.size} Bytes</span>
            </section>
            <div onClick={() => handleDeleteFile(file.id)}>
              <MdDelete size="20" color="#eb264a" />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export const FileList = memo(FileListComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.files, nextProps.files);
});
