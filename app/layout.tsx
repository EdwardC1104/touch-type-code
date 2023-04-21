import { AuthContextProvider } from "auth/context/AuthContextProvider";
import CookiePopup from "components/CookiePopup";
import NavgiationBar from "components/NavigationBar";
import Script from "next/script";
import "styles/globals.scss";

export const metadata = {
  title: "TouchTypeCode",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className="dark" lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-F5HW4V81ZG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-F5HW4V81ZG');
        `}
      </Script>
      <body>
        <AuthContextProvider>
          <div className="top-level-div">
            <NavgiationBar />
            <main className="flex flex-auto flex-col self-center max-w-screen-xl w-full">
              <div className="w-full flex flex-auto flex-col sm:px-8 sm:py-8">
                {/* <Transition> */}
                {children}
                {/* </Transition> */}
              </div>
            </main>
            <CookiePopup />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
