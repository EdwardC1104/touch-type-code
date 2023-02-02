import emailValidator from "./emailValidator";

describe("emailValidator", () => {
  it("should return an error message if email is empty", () => {
    expect(emailValidator("")).toBe("Email is required");
  });

  it("should return an error message if email is invalid", () => {
    expect(emailValidator("test")).toBe("Invalid email address");
  });

  it("should return undefined if email is valid", () => {
    expect(emailValidator("example@example.com")).toBe(undefined);
  });
});
