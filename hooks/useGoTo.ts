import { useRouter } from "next/router";

/**
 * React hook which returns a function that can be used to navigate to another page.
 */
const useGoTo = (path: string) => {
  const router = useRouter();
  return () => router.push(path);
};

export default useGoTo;
