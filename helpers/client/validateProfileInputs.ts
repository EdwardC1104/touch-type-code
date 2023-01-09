import emailValidator from "../shared/validators/emailValidator";
import nameValidator from "../shared/validators/nameValidator";
import usernameValidator from "../shared/validators/usernameValidator";

interface Values {
  username: string;
  email: string;
  name: string;
}

const validateProfileInputs = (values: Values) => {
  const errors: Record<string, string> = {};

  const nameError = nameValidator(values.name);
  if (nameError) errors.name = nameError;

  const emailError = emailValidator(values.email);
  if (emailError) errors.email = emailError;

  const usernameError = usernameValidator(values.username);
  if (usernameError) errors.username = usernameError;

  return errors;
};

export default validateProfileInputs;
