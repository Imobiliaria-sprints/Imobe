import { AuthContextProvider } from "../context/AuthContext";
import Modal from "react-modal";

import "../styles/global.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
