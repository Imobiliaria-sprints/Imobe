import { useContext } from "react";
import { SlideContext } from "../context/SlideContext";

export const useSlide = () => {
  return useContext(SlideContext);
};
