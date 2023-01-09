import { useFormik } from "formik";
import validateSignUpInput from "lib/client/validateSignUpInputs";
import { useState } from "react";
import useGoTo from "../useGoTo";

/**
 * React hook that handles the logic for the sign up form submission
 * and also wraps the formik library to handle the form state.
 */
const useSignUpForm = () => {
  const goToCourses = useGoTo("/courses");

  // Stores errors returned from the server
  const [globalErrorMessage, setGlobalErrorMessage] = useState<string | null>(
    null
  );

  const formController = useFormik({
    // Set initial values of each field in the form
    initialValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
    // Pass in the validation function
    validate: validateSignUpInput,
    // Handle form submission
    onSubmit: async (values, { setSubmitting }) => {
      // Send a POST request to the API to create a new user with the values from the form
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const json = await res.json();
      const { ok } = res;

      // Prevents the form being accidentally submitted twice - part of the Formik library
      setSubmitting(false);

      // If the request was successful, redirect to the courses page
      if (ok) goToCourses();
      // If the response is not 200, set the global error message to the error returned by the API
      else setGlobalErrorMessage(json.error);
    },
  });

  return { formController, globalErrorMessage };
};

export default useSignUpForm;
