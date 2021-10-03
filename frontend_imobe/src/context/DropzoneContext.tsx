import { useState } from "react";
import { createContext, ReactNode } from "react";
import { v4 as uuid } from "uuid";

type DropzoneContextData = {
  files: Files[];
  handleFiles: (files_accept: File[]) => void;
  handleDeleteFile: (file_id: string) => void;
};

type DropzoneContextProviderProps = {
  children: ReactNode;
};

interface Files extends File {
  id: string;
  preview: string;
}

export const DropzoneContext = createContext({} as DropzoneContextData);

export function DropzoneContextProvider({
  children,
}: DropzoneContextProviderProps) {
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
  }

  return (
    <DropzoneContext.Provider value={{ files, handleFiles, handleDeleteFile }}>
      {children}
    </DropzoneContext.Provider>
  );
}
