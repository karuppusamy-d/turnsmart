import { ReactElement } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#2d89ef"
          />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="Project.io" />
          <meta name="application-name" content="Project.io" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          {/*  RSS Feed url */}
          <link rel="alternate" type="application/rss+xml" href="/index.xml" />

          {/* Fonts  */}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          />
        </Head>
        <body className="antialiased text-black bg-white dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
