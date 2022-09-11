import { SessionContext } from "context/Session/SessionContext";
import { useContext } from "react";

/**
 * Gets the session from the context.
 */
const useSession = () => {
  const session = useContext(SessionContext);
  return session;
};

export default useSession;
