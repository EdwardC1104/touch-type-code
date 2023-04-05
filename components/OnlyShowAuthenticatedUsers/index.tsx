"use client";

import { useAuthContext } from "hooks/useAuthContext";

interface Props {
  children: React.ReactNode;
}

const OnlyShowAuthenticatedUsers = ({ children }: Props) => {
  const { user } = useAuthContext();

  return user ? <>{children}</> : null;
};

export default OnlyShowAuthenticatedUsers;
