/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { AuthContextProvider } from "../context/AuthContext";
import Modal from "react-modal";
import "../styles/global.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { DropzoneContextProvider } from "../context/DropzoneContext";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../styles/theme";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import {AnnouncementContextProvider} from "../context/AnnouncementContext";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}


function MyApp(props) {
  const { Component, pageProps } = props;
  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthContextProvider>
            <DropzoneContextProvider>
              <AnnouncementContextProvider>
                <Component {...pageProps} />
              </AnnouncementContextProvider>
            </DropzoneContextProvider>
          </AuthContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
  );
}

export default MyApp;
