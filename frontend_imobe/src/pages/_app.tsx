import { AuthContextProvider } from "../context/AuthContext";
import Modal from "react-modal";
import "../styles/global.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { SlideContextProvider } from "../context/SlideContext";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SlideContextProvider>
          <Component {...pageProps} />
        </SlideContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
