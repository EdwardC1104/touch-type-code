const passwordValidator = (password: string) => {
  let error;

  // Validate password exists
  if (!password) error = "Password is required";
  // Validate password is longer than 8 characters
  else if (password.length <= 8)
    error = "Password must be longer than 8 characters";
  // Validate password contains at least one number - RegEx written by me
  else if (!/^.*[0-9].*$/.test(password))
    error = "Password must contain at least one number";
  // Validate password contains at least one symbol - RegEx written by me
  else if (!/^.*[^a-zA-z0-9].*$/.test(password))
    error = "Password must contain at least one symbol";

  return error;
};

export default passwordValidator;
