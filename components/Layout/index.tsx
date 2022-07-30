import NavgiationBar from "@components/NavigationBar";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <NavgiationBar />
      <main className="flex flex-auto flex-col self-center max-w-screen-xl w-full ">
        <div className="w-full flex flex-auto flex-col px-8 py-8">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
