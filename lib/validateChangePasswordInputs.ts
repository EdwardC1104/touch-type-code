import passwordValidator from "./validators/passwordValidator";

interface Values {
  password: string;
  newPassword: string;
}

const validateChangePasswordInputs = (values: Values) => {
  const errors: Record<string, string> = {};

  if (!values.password) errors.password = "Required";

  const passwordError = passwordValidator(values.newPassword);
  if (passwordError) errors.newPassword = passwordError;

  return errors;
};

export default validateChangePasswordInputs;
