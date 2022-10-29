import { getServerSession } from "lib/getServerSession";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import MyForm from "components/Form";
import useChangePasswordForm from "hooks/formControllers/useChangePasswordForm";

const Profile: NextPage = () => {
  const { formController, globalErrorMessage } = useChangePasswordForm();

  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getServerSession(req);
  if (user)
    return {
      props: {},
    };
  else
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
};

export default Profile;
