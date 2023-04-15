import toTitleCase from "helpers/toTitleCase";
import { usePathname } from "next/navigation";

const usePathSegments = () => {
  const pathname = usePathname() || "/";
  const path = pathname
    .slice(1)
    .split("/")
    .map((segement, index, pathSegements) => {
      const link = "/" + pathSegements.slice(0, index + 1).join("/");
      const name = toTitleCase(segement);
      return { name, link };
    });
  return path;
};

export default usePathSegments;
