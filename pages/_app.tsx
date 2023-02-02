import Layout from "components/Layout";
import Transition from "components/Transition";
import SessionProvider from "context/Session/SessionProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/globals.scss";

/**
 * A wrapper for every page in the app.
 * Both a default page layout and a transition between pages are defined here.
 */
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider>
        <Layout>
          <Transition>
            <Component {...pageProps} />
          </Transition>
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
