const emailValidator = (email: string) => {
  let error;

  // Validate email exists
  if (!email) error = "Required";
  // Check if email is valid by using a RegEx from https://emailregex.com/
  else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  )
    error = "Invalid email address";

  return error;
};

export default emailValidator;
