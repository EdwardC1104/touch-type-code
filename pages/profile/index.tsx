import Database from "database/Database";
import useSession from "hooks/useSession";
import { getCookie } from "lib/cookies";
import { getServerSession } from "lib/getServerSession";
import { verifyJWT } from "lib/jwt";
import type { GetServerSideProps, NextApiRequest, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

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
