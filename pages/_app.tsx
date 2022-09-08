import "@styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@components/Layout";
import Head from "next/head";
import Transition from "@components/Transition";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <Transition>
          <Component {...pageProps} />
        </Transition>
      </Layout>
    </>
  );
}

export default MyApp;
