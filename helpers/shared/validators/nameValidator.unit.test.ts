import nameValidator from "./nameValidator";

describe("nameValidator", () => {
  it("should return an error message if name is empty", () => {
    expect(nameValidator("")).toBe("Name is required");
  });

  it("should return an error message if name is less than 4 characters", () => {
    expect(nameValidator("ab")).toBe("Name must be longer than 3 characters");
    expect(nameValidator("bob")).toBe("Name must be longer than 3 characters");
  });

  it("should return an error message if name is more than 20 characters", () => {
    expect(nameValidator("abcdefghijklmnopqrstu")).toBe(
      "Name must be shorter than 20 characters"
    );
    expect(
      nameValidator("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz")
    ).toBe("Name must be shorter than 20 characters");
  });

  it("should return an error message if name contains special characters or numbers", () => {
    expect(nameValidator("bob123")).toBe(
      "Name must not contain any special characters or numbers"
    );
    expect(nameValidator("bob!")).toBe(
      "Name must not contain any special characters or numbers"
    );
  });
});
