import { db } from "config/firebase";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const addNewUser = async (user: User) => {
  await setDoc(doc(db, "users", user.uid), {});
};

export default addNewUser;
