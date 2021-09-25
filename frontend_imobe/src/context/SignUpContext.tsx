import { createContext, ReactNode, useState } from "react";
import { v4 as uuid } from "uuid";

type SignUpContextProvider = {
  children: ReactNode;
};

type SignUpContextData = {
  files: Files[];
  handleFiles: (files_accept: File[]) => void;
  handleDeleteFile: (file_id: string) => void;
};

interface Files extends File {
  id: string;
  preview: string;
}

export const SignUpContext = createContext({} as SignUpContextData);

export function SignUpContextProvider({ children }: SignUpContextProvider) {
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
    <SignUpContext.Provider value={{ files, handleFiles, handleDeleteFile }}>
      {children}
    </SignUpContext.Provider>
  );
}
