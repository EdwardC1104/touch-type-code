"use client";

import { AuthContext } from "auth/context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => useContext(AuthContext);
