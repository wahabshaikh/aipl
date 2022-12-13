import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import ReactTooltip from "react-tooltip";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-6SGJEJRLQJ"
      />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6SGJEJRLQJ', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <Component {...pageProps} />
      <ReactTooltip effect="solid" />
      <Toaster />
      <Analytics />
    </>
  );
}

export default MyApp;
