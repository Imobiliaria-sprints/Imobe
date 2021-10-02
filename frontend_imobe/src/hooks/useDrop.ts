import { useState } from "react";
import { v4 as uuid } from "uuid";

type DropzoneData = {
  files: Files[];
  handleFiles: (files_accept: File[]) => void;
  handleDeleteFile: (file_id: string) => void;
};

interface Files extends File {
  id: string;
  preview: string;
}

export const useDrop = (): DropzoneData => {
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

  function handleDeleteFile(file_id: string) {
    setFiles(files.filter((file) => file.id !== file_id));
    console.log(files);
  }

  return { files, handleFiles, handleDeleteFile };
};
