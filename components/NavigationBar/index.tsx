import useSession from "hooks/useSession";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const NavgiationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userSession } = useSession();

  const router = useRouter();

  const links = [
    {
      name: "Courses",
      href: "/courses",
      isCTA: false,
    },
    // {
    //   name: "Pricing",
    //   href: "/pricing",
    //   isCTA: false,
    // },
  ];

  // I check whether the user is logged in using the 'userSession' value and not the
  // 'status' value because the 'status' may be "loading" which causes flickering on every
  // url change. The 'userSession' value could be stale but this isn't an issue here.
  if (userSession) {
    links.push({
      name: "Dashboard",
      href: "/dashboard",
      isCTA: false,
    });

    links.push({
      name: "Profile",
      href: "/profile",
      isCTA: false,
    });

    links.push({
      name: "Logout",
      href: "/logout",
      isCTA: false,
    });
  } else {
    links.push({
      name: "Login",
      href: "/login",
      isCTA: false,
    });

    links.push({
      name: "Sign up",
      href: "/signup",
      isCTA: true,
    });
  }
  const navigate = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 bg-neutral-900 drop-shadow-lg">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex-none text-xl font-semibold text-white"
          >
            touch type code
          </button>
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
            {links.map((link) => {
              if (link.isCTA)
                return (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.href)}
                    className="font-medium text-white block bg-green-600 hover:bg-green-700 focus:bg-green-700 py-1.5 px-4 rounded-md text-center max-w-fit self-center"
                  >
                    {link.name}
                  </button>
                );
              else if (link.href === "/logout")
                return (
                  <Link href={link.href} key={link.name}>
                    <a
                      key={link.name}
                      onClick={async (e) => {
                        e.preventDefault();
                        await fetch("/api/auth/logout", {
                          method: "POST",
                        });
                        router.reload();
                      }}
                      className="font-medium text-neutral-300 hover:text-neutral-400 text-center"
                    >
                      {link.name}
                    </a>
                  </Link>
                );
              else if (router.asPath !== link.href)
                return (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.href)}
                    className="font-medium text-neutral-300 hover:text-neutral-400 text-center"
                  >
                    {link.name}
                  </button>
                );
              else
                return (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.href)}
                    className="font-medium text-green-400 text-center"
                  >
                    {link.name}
                  </button>
                );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavgiationBar;
