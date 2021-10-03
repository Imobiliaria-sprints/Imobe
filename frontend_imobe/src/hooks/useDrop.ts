import { useContext } from "react";
import { DropzoneContext } from "../context/DropzoneContext";

export const useDrop = () => {
  return useContext(DropzoneContext);
};
