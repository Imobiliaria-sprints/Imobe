import { createContext, ReactNode, SetStateAction, useState } from "react";

type ModalContextProviderProps = {
  children: ReactNode;
};

type ModalContextData = {
  isActive: boolean;
  modalCustomStyles: Object;
  handleModalOpen: () => void;
};

export const ModalContext = createContext({} as ModalContextData);

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [isActive, setIsActive] = useState(false);

  function handleModalOpen(): void {
    return setIsActive(!isActive);
  }

  const modalCustomStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "30rem",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <ModalContext.Provider
      value={{ isActive, handleModalOpen, modalCustomStyles }}
    >
      {children}
    </ModalContext.Provider>
  );
}
