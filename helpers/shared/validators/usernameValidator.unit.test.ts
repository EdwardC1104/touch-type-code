import usernameValidator from "./usernameValidator";

describe("usernameValidator", () => {
  it("should return an error message if username is empty", () => {
    expect(usernameValidator("")).toBe("Username is required");
  });

  it("should return an error message if username is less than 4 characters", () => {
    expect(usernameValidator("abc")).toBe(
      "Username must be longer than 3 characters"
    );
  });

  it("should return an error message if username is more than 12 characters", () => {
    expect(usernameValidator("abcdefghijkl")).toBe(
      "Username must be shorter than 12 characters"
    );
  });

  it("should return an error message if username contains special characters or spaces", () => {
    expect(usernameValidator("abc jhg")).toBe(
      "Username must not contain any special characters or spaces"
    );
    expect(usernameValidator("abc!")).toBe(
      "Username must not contain any special characters or spaces"
    );
  });
});
