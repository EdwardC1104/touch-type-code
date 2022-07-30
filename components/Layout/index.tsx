import NavgiationBar from "@components/NavigationBar";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavgiationBar />
      <main className="flex flex-auto flex-col self-center max-w-screen-xl w-full ">
        <div className="w-full flex flex-auto flex-col sm:px-8 sm:py-8">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
