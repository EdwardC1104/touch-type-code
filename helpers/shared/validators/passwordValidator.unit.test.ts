import passwordValidator from "./passwordValidator";

describe("passwordValidator", () => {
  it("should return an error message if password is empty", () => {
    expect(passwordValidator("")).toBe("Password is required");
  });

  it("should return an error message if password is less than 8 characters", () => {
    expect(passwordValidator("1234567")).toBe(
      "Password must be longer than 8 characters"
    );
  });

  it("should return an error message if password does not contain at least one number", () => {
    expect(passwordValidator("abcdefghkjh")).toBe(
      "Password must contain at least one number"
    );
  });

  it("should return an error message if password does not contain at least one symbol", () => {
    expect(passwordValidator("abcdefghkjh1")).toBe(
      "Password must contain at least one symbol"
    );
  });
});
