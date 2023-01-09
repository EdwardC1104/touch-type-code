import emailValidator from "../shared/validators/emailValidator";
import nameValidator from "../shared/validators/nameValidator";
import passwordValidator from "../shared/validators/passwordValidator";
import usernameValidator from "../shared/validators/usernameValidator";

interface Values {
  username: string;
  password: string;
  email: string;
  name: string;
}

const validateSignUpInput = (values: Values) => {
  const errors: Record<string, string> = {};

  const nameError = nameValidator(values.name);
  if (nameError) errors.name = nameError;

  const emailError = emailValidator(values.email);
  if (emailError) errors.email = emailError;

  const usernameError = usernameValidator(values.username);
  if (usernameError) errors.username = usernameError;

  const passwordError = passwordValidator(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export default validateSignUpInput;
