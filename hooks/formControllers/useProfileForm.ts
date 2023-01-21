import { useFormik } from "formik";
import validateProfileInputs from "helpers/client/validateProfileInputs";
import { useState } from "react";
import useGoTo from "../useGoTo";

/**
 * React hook that handles the logic for the edit profile form submission
 * and also wraps the formik library to handle the form state.
 */
const useProfileForm = () => {
  const goToLogin = useGoTo("/login");

  // Stores errors returned from the server
  const [globalErrorMessage, setGlobalErrorMessage] = useState<string | null>(
    null
  );

  const formController = useFormik({
    // Set initial values of each field in the form
    initialValues: {
      username: "",
      email: "",
      name: "",
    },
    // Pass in the validation function
    validate: validateProfileInputs,
    // Handle form submission
    onSubmit: async (values, { setSubmitting }) => {
      // Send a POST request to the API to edit the user's profile with the values from the form
      const res = await fetch("/api/user/edit", {
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

export default useProfileForm;
