import validateProfileInputs from "./validateProfileInputs";

describe("validateProfileInputs", () => {
  it("should return an error is any field is left blank", () => {
    const values = {
      username: "",
      email: "",
      name: "",
    };

    const errors = validateProfileInputs(values);

    expect(errors).toEqual({
      username: "Username is required",
      email: "Email is required",
      name: "Name is required",
    });
  });

  it("should return an error if the email is invalid", () => {
    const values = {
      username: "username1",
      email: "email",
      name: "Edward",
    };

    const errors = validateProfileInputs(values);

    expect(errors).toEqual({
      email: "Invalid email address",
    });
  });

  it("should return an error if the username is invalid", () => {
    let values = {
      username: "user name@1",
      email: "example@example.com",
      name: "Edward",
    };

    let errors = validateProfileInputs(values);

    expect(errors).toEqual({
      username: "Username must not contain any special characters or spaces",
    });
  });

  it("should return an error if the name is invalid", () => {
    let values = {
      username: "username1",
      email: "example@example.com",
      name: "Edward123",
    };

    let errors = validateProfileInputs(values);

    expect(errors).toEqual({
      name: "Name must not contain any special characters or numbers",
    });
  });
});
