import Layout from "components/Layout";
import Transition from "components/Transition";
import { AuthContextProvider } from "context/Session/AuthContextProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
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
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-9WRFH8JXRE"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9WRFH8JXRE', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <AuthContextProvider>
        <Layout>
          <Transition>
            <Component {...pageProps} />
          </Transition>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
