const nameValidator = (name: string) => {
  let error;

  // Validate name exists
  if (!name) error = "Name is required";
  // Validate name is longer than 3 characters
  else if (name.length <= 3) error = "Name must be longer than 3 characters";
  // Validate name is shorter than 20 characters
  else if (name.length > 20) error = "Name must be shorter than 20 characters";
  // Validate name only contains letters and spaces - RegEx written by me
  else if (!/^[A-Za-z ]+$/.test(name))
    error = "Name must not contain any special characters or numbers";

  return error;
};

export default nameValidator;
