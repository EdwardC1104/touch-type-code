import validateSignUpInput from "./validateSignUpInputs";

describe("validateSignUpInput", () => {
  it("should return an error message if any field is left blank", () => {
    const values = {
      username: "",
      password: "",
      email: "",
      name: "",
    };

    const errors = validateSignUpInput(values);

    expect(errors).toEqual({
      username: "Username is required",
      password: "Password is required",
      email: "Email is required",
      name: "Name is required",
    });
  });

  it("should return an error if the email is invalid", () => {
    const values = {
      username: "username1",
      email: "email",
      name: "Edward",
      password: "password123@",
    };

    const errors = validateSignUpInput(values);

    expect(errors).toEqual({
      email: "Invalid email address",
    });
  });

  it("should return an error if the username is invalid", () => {
    let values = {
      username: "user name@1",
      email: "example@example.com",
      name: "Edward",
      password: "password123@",
    };

    let errors = validateSignUpInput(values);

    expect(errors).toEqual({
      username: "Username must not contain any special characters or spaces",
    });
  });

  it("should return an error if the name is invalid", () => {
    let values = {
      username: "username1",
      email: "example@example.com",
      name: "Edward123",
      password: "password123@",
    };

    let errors = validateSignUpInput(values);

    expect(errors).toEqual({
      name: "Name must not contain any special characters or numbers",
    });
  });

  it("should return an error if the password is invalid", () => {
    let values = {
      username: "username1",
      email: "example@example.com",
      name: "Edward",
      password: "password123",
    };
    let errors = validateSignUpInput(values);
    expect(errors).toEqual({
      password: "Password must contain at least one symbol",
    });

    values = {
      username: "username1",
      email: "example@example.com",
      name: "Edward",
      password: "passworddddddd",
    };
    errors = validateSignUpInput(values);
    expect(errors).toEqual({
      password: "Password must contain at least one number",
    });

    values = {
      username: "username1",
      email: "example@example.com",
      name: "Edward",
      password: "",
    };
    errors = validateSignUpInput(values);
    expect(errors).toEqual({
      password: "Password is required",
    });

    values = {
      username: "username1",
      email: "example@example.com",
      name: "Edward",
      password: "pass",
    };
    errors = validateSignUpInput(values);
    expect(errors).toEqual({
      password: "Password must be longer than 8 characters",
    });
  });
});
