import { ReactElement } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { SEO } from "@/components/SEO";
import LayoutWrapper from "@/components/LayoutWrapper";

import "@/styles/globals.css";

const progress = new ProgressBar({
  size: 2,
  color: "#38bdf8",
  className: "progress-bar",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ThemeProvider
      defaultTheme="system"
      disableTransitionOnChange
      attribute="class"
    >
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
};

export default App;
