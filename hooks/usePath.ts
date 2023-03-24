import toTitleCase from "helpers/shared/toTitleCase";
import { useRouter } from "next/router";

const usePath = () => {
  const router = useRouter();
  const { asPath } = router;
  const path = asPath
    .slice(1)
    .split("/")
    .map((segement, index, pathSegements) => {
      const link = "/" + pathSegements.slice(0, index + 1).join("/");
      const name = toTitleCase(segement);
      return { name, link };
    });
  return path;
};

export default usePath;
