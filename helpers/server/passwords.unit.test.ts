import { generatePassword, passwordIsValid } from "./passwords";

describe("generatePassword", () => {
  it("should return a hash and a salt", () => {
    const password = "password123@";
    const { salt, hash } = generatePassword(password);

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
});

describe("passwordIsValid", () => {
  it("should return true if the password is valid", () => {
    const password = "password123@";
    const { salt, hash } = generatePassword(password);

    const isValid = passwordIsValid(password, hash, salt);

    expect(isValid).toBeTruthy();
  });

  it("should return false if the password is invalid", () => {
    const password = "password123@";
    const { salt, hash } = generatePassword(password);

    const isValid = passwordIsValid("password123", hash, salt);

    expect(isValid).toBeFalsy();
  });
});
