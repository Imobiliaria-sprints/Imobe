import { ModalContextProvider } from "../context/ModalContext";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;
