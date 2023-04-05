import {
  GoogleAuthProvider,
  reauthenticateWithPopup,
  User,
} from "firebase/auth";
import getProvider from "./getProvider";

const reauthenticate = async (user: User) => {
  const provider = getProvider(user.providerData[0].providerId);

  const { user: newUser } = await reauthenticateWithPopup(
    user,
    new GoogleAuthProvider()
  );
  return newUser;
};

export default reauthenticate;
