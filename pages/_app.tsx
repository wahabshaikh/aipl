import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import ReactTooltip from "react-tooltip";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ReactTooltip effect="solid" />
      <Toaster />
      <Analytics />
    </>
  );
}

export default MyApp;
