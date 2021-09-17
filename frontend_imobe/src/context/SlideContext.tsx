import { useState } from "react";
import { createContext, ReactNode } from "react";

type SlideContextData = {
  nextImage: () => void;
  lastImage: () => void;
  slideImages: (images: ImageProps[]) => ImageProps;
};

type SlideContextProviderProps = {
  children: ReactNode;
};

type ImageProps = {
  id: string;
  url: string;
};

export const SlideContext = createContext({} as SlideContextData);

export function SlideContextProvider({ children }: SlideContextProviderProps) {
  const [currentImage, setCurrentImage] = useState(0);

  function nextImage(): void {
    return setCurrentImage(currentImage + 1);
  }

  function lastImage(): void {
    return setCurrentImage(currentImage - 1);
  }

  function slideImages(images: ImageProps[]): ImageProps {
    const totalImages = images.length;

    if (currentImage > totalImages - 1) {
      setCurrentImage(0);
      return images[currentImage - 1];
    }

    if (currentImage < 0) {
      setCurrentImage(totalImages - 1);
      return images[totalImages - 1];
    }

    const image = images[currentImage];

    return image;
  }

  return (
    <SlideContext.Provider value={{ nextImage, lastImage, slideImages }}>
      {children}
    </SlideContext.Provider>
  );
}
