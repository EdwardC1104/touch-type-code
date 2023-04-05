import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const getProvider = (provider: string) => {
  switch (provider) {
    case "google.com":
      return new GoogleAuthProvider();
    case "github.com":
      return new GithubAuthProvider();
    default:
      throw new Error("Invalid provider");
  }
};

export default getProvider;
