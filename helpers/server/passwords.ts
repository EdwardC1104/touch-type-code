import crypto from "crypto";

/**
 * Receives a password and returns a hash and a randomly generated salt.
 */
const generatePassword = (password: string) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
};

/**
 * Hashes a password with a given salt and checks if it matches the stored hash.
 * This is used to verify a password is correct.
 */
const passwordIsValid = (password: string, hash: string, salt: string) => {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

export { generatePassword, passwordIsValid };
