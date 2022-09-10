import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SessionContext } from "./SessionContext";

interface Props {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: Props) {
  const router = useRouter();

  const [session, setSession] = useState<{} | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchSession = async () => {
    setLoading(true);
    const res = await fetch("/api/user/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const { session } = await res.json();
      setSession(session);
    } else {
      setErrorMessage("Failed to fetch session");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSession();
  }, [router.asPath]);

  if (errorMessage) return <p>{errorMessage}</p>;

  const status = loading ? "loading" : session ? "loggedIn" : "loggedOut";
  return (
    <SessionContext.Provider value={{ status, session }}>
      <SessionContext.Consumer>{(ctx) => children}</SessionContext.Consumer>
    </SessionContext.Provider>
  );
}
