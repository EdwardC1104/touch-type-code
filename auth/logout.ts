import firebase_app from "config/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function logout() {
  let error = null;
  try {
    await auth.signOut();
  } catch (e) {
    error = e;
  }
  return { error };
}
