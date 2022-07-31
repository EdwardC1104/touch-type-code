import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession, User } from "next-auth";
import Head from "next/head";
import Link from "next/link";
import { authOptions } from "@pages/api/auth/[...nextauth]";

interface Props {
  user: User;
}

const Profile: NextPage<Props> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        <h1>Profile</h1>

        <p>{JSON.stringify(user)}</p>

        <p>
          <Link href="profile/delete">delete</Link>
        </p>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};

export default Profile;
