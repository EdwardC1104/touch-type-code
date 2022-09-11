import { createContext } from "react";

type Session = {
  status: "loading" | "authenticated" | "unauthenticated";
  userSession: UserSession | null;
};

export const SessionContext = createContext<Session>({
  status: "unauthenticated",
  userSession: null,
});
