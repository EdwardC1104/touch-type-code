import OnlyShowAuthenticatedUsers from "components/OnlyShowAuthenticatedUsers";
import OnlyShowUnauthenticatedUsers from "components/OnlyShowUnauthenticatedUsers";
import type { NextPage } from "next";
import Link from "next/link";

/**
 * @Path /
 */
const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-auto flex-col justify-center sm:px-0 sm:py-0 px-8 py-8">
        <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-bold lg:mb-4 mb-2 leading-2 text-neutral-400">
          Increase productivity
        </h1>
        <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-bold lg:mb-4 mb-2 leading-2">
          Learn to touch type code
        </h1>
        <p className="lg:text-xl md:text-base text-sm lg:mt-8 mt-4 lg:mb-4 mb-2 text-neutral-400">
          Increase your code writing speed with touch <br />
          typing courses targeted at developers.
        </p>
        <OnlyShowUnauthenticatedUsers>
          <Link
            href="/signup"
            className="lg:mt-8 mt-4 font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 lg:py-2 lg:px-7 py-1.5 px-4 rounded-xl text-center max-w-fit lg:text-xl md:text-base text-sm "
          >
            Sign up for free
          </Link>
        </OnlyShowUnauthenticatedUsers>
        <OnlyShowAuthenticatedUsers>
          <Link
            href="/courses"
            className="lg:mt-8 mt-4 font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 lg:py-2 lg:px-7 py-1.5 px-4 rounded-xl text-center max-w-fit lg:text-xl md:text-base text-sm "
          >
            Get started
          </Link>
        </OnlyShowAuthenticatedUsers>
      </div>
    </>
  );
};

export default Home;
