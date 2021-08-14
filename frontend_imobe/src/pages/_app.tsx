import { AuthContextProvider } from "../context/AuthContext";
import { ModalContextProvider } from "../context/ModalContext";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <Component {...pageProps} />
      </ModalContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
