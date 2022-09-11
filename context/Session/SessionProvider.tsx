import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SessionContext } from "./SessionContext";

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  const router = useRouter();

  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSession = async () => {
    setLoading(true);
    const res = await fetch("/api/user/session", { method: "GET" }); // Fetch session from endpoint

    if (res.ok) {
      const { session } = await res.json(); // Get session from response
      setUserSession(session); // This may be a valid session or null if no session exists
    } else setUserSession(null); // Error fetching session

    setLoading(false);
  };

  useEffect(() => {
    fetchSession(); // Fetch session on mount and every time the url changes
  }, [router.asPath]);

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
