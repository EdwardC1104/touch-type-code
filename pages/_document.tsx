import { Head, Html, Main, NextScript } from "next/document";

/**
 * A custom document is used to augment the app's <html>, <head>, and <body> tags.
 */
export default function Document() {
  return (
    <Html className="dark" lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
