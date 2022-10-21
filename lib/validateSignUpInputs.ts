interface Values {
  username: string;
  password: string;
  email: string;
  name: string;
}

const validateSignUpInput = (values: Values) => {
  const errors: Record<string, string> = {};

  // Validate name exists
  if (!values.name) errors.name = "Required";

  // Validate email exists
  if (!values.email) errors.email = "Required";
  // Check if email is valid by using a RegEx from https://emailregex.com/
  else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    )
  )
    errors.email = "Invalid email address";

  // Validate username exists
  if (!values.username) errors.username = "Required";
  // Validate username is longer than 3 characters
  else if (values.username.length <= 3)
    errors.username = "Must be longer than 3 characters";
  // Validate password is shorter than 12 characters
  else if (values.username.length >= 12)
    errors.username = "Must be shorter than 12 characters";
  // Validate username is alphanumeric - RegEx written by me
  else if (!/^[A-Za-z0-9]+$/.test(values.username))
    errors.username = "Must not contain any special characters or spaces";

  // Validate password exists
  if (!values.password) errors.password = "Required";
  // Validate password is longer than 8 characters
  else if (values.password.length <= 8)
    errors.password = "Must be longer than 8 characters";
  // Validate password contains at least one number - RegEx written by me
  else if (!/^.*[0-9].*$/.test(values.password))
    errors.password = "Must contain at least one number";
  // Validate password contains at least one symbol - RegEx written by me
  else if (!/^.*[^a-zA-z0-9].*$/.test(values.password))
    errors.password = "Must contain at least one symbol";

  return errors;
};

export default validateSignUpInput;
