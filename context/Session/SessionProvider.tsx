"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { blankUserSession, SessionContext } from "./SessionContext";

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  const pathname = usePathname();

  const [userSession, setUserSession] = useState<UserSession>(blankUserSession);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSession = async () => {
    setLoading(true);
    const res = await fetch("/api/user/session", { method: "GET" }); // Fetch session from endpoint

    if (res.ok) {
      const { session } = await res.json(); // Get session from response
      setUserSession(session); // This may be a valid session or null if no session exists
    } else setUserSession(blankUserSession); // Error fetching session

    setLoading(false);
  };

  useEffect(() => {
    fetchSession(); // Fetch session on mount and every time the url changes
  }, [pathname]);

  const status = loading
    ? "loading"
    : userSession
    ? "authenticated"
    : "unauthenticated";

  return (
    <SessionContext.Provider value={{ status, userSession }}>
      <SessionContext.Consumer>{() => children}</SessionContext.Consumer>
    </SessionContext.Provider>
  );
}
