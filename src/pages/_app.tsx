import * as React from "react";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { ReactNode } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import createEmotionCache from "../utils/createEmotionCache";
import lightThemeOptions from "../styles/theme/lightThemeOptions";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Router } from "next/router";
const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();

NProgress.configure({ showSpinner: false, speed: 800, parent: "body" });
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const lightTheme = createTheme(lightThemeOptions);

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = (
  props
) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
