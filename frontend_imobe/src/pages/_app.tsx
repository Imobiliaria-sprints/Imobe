import { AuthContextProvider } from "../context/AuthContext";
import Modal from "react-modal";
import "../styles/global.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { SlideContextProvider } from "../context/SlideContext";
import { DropzoneContextProvider } from "../context/DropzoneContext";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DropzoneContextProvider>
          <SlideContextProvider>
            <Component {...pageProps} />
          </SlideContextProvider>
        </DropzoneContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
