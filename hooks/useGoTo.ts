"use client";

import { useRouter } from "next/navigation";

/**
 * React hook which returns a function that can be used to navigate to another page.
 * Abstracts away the use of the Next.js router.
 */
const useGoTo = (path: string) => {
  const router = useRouter();
  return () => router.push(path);
};

export default useGoTo;
