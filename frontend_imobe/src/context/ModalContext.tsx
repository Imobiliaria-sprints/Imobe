import { createContext, ReactNode, SetStateAction, useState } from "react";

type ModalContextProviderProps = {
  children: ReactNode;
};

type ModalContextData = {
  isActive: boolean;
  handleModalOpen: () => void;
};

export const ModalContext = createContext({} as ModalContextData);

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [isActive, setIsActive] = useState(false);

  function handleModalOpen(): void {
    return setIsActive(!isActive);
  }

  return (
    <ModalContext.Provider value={{ isActive, handleModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
