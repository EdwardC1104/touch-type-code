"use client";

import { AuthContext } from "context/Session/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => useContext(AuthContext);
