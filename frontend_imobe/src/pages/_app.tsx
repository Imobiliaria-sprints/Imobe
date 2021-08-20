import { AuthContextProvider } from "../context/AuthContext";
import Modal from "react-modal";

import "../styles/global.scss";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
