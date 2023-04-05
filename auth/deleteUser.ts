import { User } from "firebase/auth";
import reauthenticate from "./reauthenticate";

const deleteUser = async (user: User) => {
  await reauthenticate(user);
  await user.delete();
};

export default deleteUser;
