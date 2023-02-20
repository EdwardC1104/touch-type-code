import MyForm from "components/Form";
import { getServerSession } from "helpers/server/getServerSession";
import useProfileForm from "hooks/formControllers/useProfileForm";
import useGoTo from "hooks/useGoTo";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

interface Props {
  user: User;
}

const Profile: NextPage<Props> = ({ user }) => {
  const goToHome = useGoTo("/");

  const deleteAccount = async () => {
    const res = await fetch("/api/user/delete", { method: "DELETE" });

    if (res.status === 200) goToHome();
  };

  const { formController, globalErrorMessage } = useProfileForm();

  useEffect(() => {
    formController.setValues({
      name: user.name,
      email: user.email,
      username: user.username,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
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

// Server-side
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await getServerSession(req);
  if (user)
    return {
      props: {
        user,
      },
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
