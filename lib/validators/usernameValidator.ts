const usernameValidator = (username: string) => {
  let error;

  // Validate username exists
  if (!username) error = "Required";
  // Validate username is longer than 3 characters
  else if (username.length <= 3) error = "Must be longer than 3 characters";
  // Validate password is shorter than 12 characters
  else if (username.length >= 12) error = "Must be shorter than 12 characters";
  // Validate username is alphanumeric - RegEx written by me
  else if (!/^[A-Za-z0-9]+$/.test(username))
    error = "Must not contain any special characters or spaces";

  return error;
};

export default usernameValidator;
