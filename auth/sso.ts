import firebase_app from "config/firebase";
import addNewUser from "data/addNewUser";
import { getAuth, signInWithPopup } from "firebase/auth";
import getProvider from "./getProvider";

const auth = getAuth(firebase_app);

export default async function sso(providerName: string) {
  const provider = getProvider(providerName);

  let result = null;
  let error: string | null = null;
  try {
    result = await signInWithPopup(auth, provider);
    const user = result.user;
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      addNewUser(user);
    }
  } catch (e: any) {
    error = e.message;
  }

  return { result, error };
}
