import { createContext } from "react";

type Session = {
  status: "loading" | "authenticated" | "unauthenticated";
  userSession: UserSession;
};

export const blankUserSession: UserSession = {
  id: NaN,
  name: "",
  username: "",
  email: "",
};

export const SessionContext = createContext<Session>({
  status: "unauthenticated",
  userSession: blankUserSession,
});
