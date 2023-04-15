"use client";

import { User } from "firebase/auth";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});
