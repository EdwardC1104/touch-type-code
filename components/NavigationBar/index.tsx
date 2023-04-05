"use client";

import logout from "auth/logout";
import OnlyShowAuthenticatedUsers from "components/OnlyShowAuthenticatedUsers";
import OnlyShowUnauthenticatedUsers from "components/OnlyShowUnauthenticatedUsers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavgiationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const close = () => {
    setIsOpen(false);
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 bg-neutral-900 drop-shadow-lg">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={close}
            className="flex-none text-xl font-semibold text-white"
          >
            touch type code
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white focus:ring-offset-neutral-800"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} w-4 h-4`}
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} w-4 h-4`}
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "" : "hidden"
          } transition-all duration-300 basis-full grow sm:block `}
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
            <Link
              href="/courses"
              onClick={close}
              className={`font-medium  hover:text-neutral-400 text-center ${
                pathname === "/courses" ? "text-green-400" : "text-neutral-300"
              }`}
            >
              Courses
            </Link>
            <OnlyShowAuthenticatedUsers>
              <Link
                href="/dashboard"
                onClick={close}
                className={`font-medium  hover:text-neutral-400 text-center ${
                  pathname === "/dashboard"
                    ? "text-green-400"
                    : "text-neutral-300"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={close}
                className={`font-medium  hover:text-neutral-400 text-center ${
                  pathname === "/profile"
                    ? "text-green-400"
                    : "text-neutral-300"
                }`}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  close();
                }}
                className="font-medium text-neutral-300 hover:text-neutral-400 text-center"
              >
                Logout
              </button>
            </OnlyShowAuthenticatedUsers>
            <OnlyShowUnauthenticatedUsers>
              <Link
                href="/login"
                onClick={close}
                className={`font-medium text-neutral-300 hover:text-neutral-400 text-center ${
                  pathname === "/login" ? "text-green-400" : "text-neutral-300"
                }`}
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={close}
                className="font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 py-1.5 px-4 rounded-md text-center max-w-fit self-center"
              >
                Sign up
              </Link>
            </OnlyShowUnauthenticatedUsers>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavgiationBar;
