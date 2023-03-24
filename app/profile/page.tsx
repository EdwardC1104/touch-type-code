"use client";

import MyForm from "components/Form";
import useProfileForm from "hooks/formControllers/useProfileForm";
import useGoTo from "hooks/useGoTo";
import useSession from "hooks/useSession";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";

/**
 * @Path /profile
 */
const Profile: NextPage = () => {
  const goToHome = useGoTo("/");

  const { userSession, status } = useSession();

  const deleteAccount = async () => {
    const res = await fetch("/api/user/delete", { method: "DELETE" });

    if (res.status === 200) goToHome();
  };

  const { formController, globalErrorMessage } = useProfileForm();

  useEffect(() => {
    formController.setValues({
      name: userSession.name,
      email: userSession.email,
      username: userSession.username,
    });
  }, [userSession, status]);

  // if (status === "loading" || status === "unauthenticated")
  //   return (
  //     <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
  //       <LoadingSpinner />
  //     </div>
  //   );

  return (
    <>
      <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
        <MyForm.Card>
          <MyForm.Title>Profile</MyForm.Title>
          <MyForm.Subtitle>Edit the credentials you provided.</MyForm.Subtitle>
          <MyForm.Form onSubmit={formController.handleSubmit}>
            <MyForm.Input
              label="Name"
              name="name"
              type="name"
              id="name"
              placeholder="Enter your name"
              onChange={formController.handleChange}
              value={formController.values.name}
              error={formController.errors.name}
              touched={formController.touched.name}
              setTouched={() =>
                formController.setFieldTouched("name", true, true)
              }
              required
            />
            <MyForm.Input
              label="Email"
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={formController.handleChange}
              value={formController.values.email}
              error={formController.errors.email}
              touched={formController.touched.email}
              setTouched={() =>
                formController.setFieldTouched("email", true, true)
              }
              required
            />
            <MyForm.Input
              label="Username"
              name="username"
              type="username"
              id="username"
              placeholder="Enter a username"
              onChange={formController.handleChange}
              value={formController.values.username}
              error={formController.errors.username}
              touched={formController.touched.username}
              setTouched={() =>
                formController.setFieldTouched("username", true, true)
              }
              required
            />
            <div className="flex justify-between mb-2">
              <button
                type="button"
                onClick={deleteAccount}
                className="font-bold bg-red-600 hover:bg-red-700 focus:bg-red-700 rounded-xl text-center h-11 mt-2 mb-1 w-40"
              >
                Delete Account
              </button>
              <MyForm.Submit value="Save Changes" mini />
            </div>
            <MyForm.ErrorMessage>{globalErrorMessage}</MyForm.ErrorMessage>
            <p className="text-sky-600 text-sm font-medium">
              <Link href="/profile/change-password">Change my password</Link>
            </p>
          </MyForm.Form>
        </MyForm.Card>
      </div>
    </>
  );
};

export default Profile;
