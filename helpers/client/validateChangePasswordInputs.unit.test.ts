import validateChangePasswordInputs from "./validateChangePasswordInputs";

describe("validateChangePasswordInputs", () => {
  it("should return an error if the old password is empty", () => {
    const values = {
      password: "",
      newPassword: "password123@",
    };

    const errors = validateChangePasswordInputs(values);

    expect(errors).toEqual({
      password: "Required",
    });
  });

  it("should return an error if the newPaswword is invalid", () => {
    let values = {
      password: "password123@",
      newPassword: "password123",
    };
    let errors = validateChangePasswordInputs(values);
    expect(errors).toEqual({
      newPassword: "Password must contain at least one symbol",
    });

    values = {
      password: "password123@",
      newPassword: "passworddddddd",
    };
    errors = validateChangePasswordInputs(values);
    expect(errors).toEqual({
      newPassword: "Password must contain at least one number",
    });

    values = {
      password: "password123@",
      newPassword: "",
    };
    errors = validateChangePasswordInputs(values);
    expect(errors).toEqual({
      newPassword: "Password is required",
    });

    values = {
      password: "password123@",
      newPassword: "pass",
    };
    errors = validateChangePasswordInputs(values);
    expect(errors).toEqual({
      newPassword: "Password must be longer than 8 characters",
    });
  });
});
