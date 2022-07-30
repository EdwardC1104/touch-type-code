import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Layout from "@components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.querySelector("html")?.classList.add("dark");
  });
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
