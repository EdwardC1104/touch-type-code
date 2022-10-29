const usernameValidator = (username: string) => {
  let error;

  // Validate username exists
  if (!username) error = "Username is required";
  // Validate username is longer than 3 characters
  else if (username.length <= 3)
    error = "Username must be longer than 3 characters";
  // Validate password is shorter than 12 characters
  else if (username.length >= 12)
    error = "Username must be shorter than 12 characters";
  // Validate username is alphanumeric - RegEx written by me
  else if (!/^[A-Za-z0-9]+$/.test(username))
    error = "Username must not contain any special characters or spaces";

  return error;
};

export default usernameValidator;
