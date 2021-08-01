import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useModal = () => {
  return useContext(ModalContext);
};
