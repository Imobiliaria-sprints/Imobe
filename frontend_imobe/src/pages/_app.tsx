import { AuthContextProvider } from "../context/AuthContext";
import Modal from "react-modal";
import "../styles/global.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { SlideContextProvider } from "../context/SlideContext";
import { DropzoneContextProvider } from "../context/DropzoneContext";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../styles/theme";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../services/createEmotionCache";
import {AnnouncementContextProvider} from "../context/AnnouncementContext";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthContextProvider>
            <DropzoneContextProvider>
              <AnnouncementContextProvider>
              <SlideContextProvider>
                <Component {...pageProps} />
              </SlideContextProvider>
              </AnnouncementContextProvider>
            </DropzoneContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
