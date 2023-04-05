import NavgiationBar from "components/NavigationBar";
import { AuthContextProvider } from "context/Session/AuthContextProvider";
import "styles/globals.scss";

export const metadata = {
  title: "TouchTypeCode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark" lang="en">
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
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
