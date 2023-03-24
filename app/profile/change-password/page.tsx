"use client";

import MyForm from "components/Form";
import useChangePasswordForm from "hooks/formControllers/useChangePasswordForm";
import type { NextPage } from "next";

/**
 * @Path /profile/change-password
 */
const ChangePassword: NextPage = () => {
  const { formController, globalErrorMessage } = useChangePasswordForm();

  return (
    <>
      <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
        <MyForm.Card>
          <MyForm.Title>Change Password</MyForm.Title>
          <MyForm.Subtitle>
            Choose a new password for your account.
          </MyForm.Subtitle>
          <MyForm.Form onSubmit={formController.handleSubmit}>
            <MyForm.Input
              label="Current Password"
              name="password"
              type="password"
              id="password"
              placeholder="Enter a password"
              onChange={formController.handleChange}
              value={formController.values.password}
              error={formController.errors.password}
              touched={formController.touched.password}
              setTouched={() =>
                formController.setFieldTouched("password", true, true)
              }
              required
            />
            <MyForm.Input
              label="New Password"
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="Enter a password"
              onChange={formController.handleChange}
              value={formController.values.newPassword}
              error={formController.errors.newPassword}
              touched={formController.touched.newPassword}
              setTouched={() =>
                formController.setFieldTouched("newPassword", true, true)
              }
              required
            />

            <MyForm.Submit value="Change Password" />
            <MyForm.ErrorMessage>{globalErrorMessage}</MyForm.ErrorMessage>
          </MyForm.Form>
        </MyForm.Card>
      </div>
    </>
  );
};

export default ChangePassword;
