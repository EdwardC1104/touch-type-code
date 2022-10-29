import { useFormik } from "formik";
import validateChangePasswordInputs from "lib/validateChangePasswordInputs";
import { useState } from "react";
import useGoTo from "../useGoTo";

/**
 * React hook that handles the logic for the change password form submission
 * and also wraps the formik library to handle the form state.
 */
const useChangePasswordForm = () => {
  const goToLogin = useGoTo("/login");

  // Stores errors returned from the server
  const [globalErrorMessage, setGlobalErrorMessage] = useState<string | null>(
    null
  );

  const formController = useFormik({
    // Set initial values of each field in the form
    initialValues: {
      password: "",
      newPassword: "",
    },
    // Pass in the validation function
    validate: validateChangePasswordInputs,
    // Handle form submission
    onSubmit: async (values, { setSubmitting }) => {
      // Send a POST request to the API to change the user's password
      const res = await fetch("/api/auth/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      const json = await res.json();
      const { ok } = res;

      // Prevents the form being accidentally submitted twice - part of the Formik library
      setSubmitting(false);

      // If the request was successful, redirect to the login page
      if (ok) goToLogin();
      // If the response is not 200, set the global error message to the error returned by the API
      else setGlobalErrorMessage(json.error);
    },
  });

  return { formController, globalErrorMessage };
};

export default useChangePasswordForm;