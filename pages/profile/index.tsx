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
  const router = useRouter();

  const deleteAccount = async () => {
    const res = await fetch("/api/user/delete", {
      method: "DELETE",
    });
    if (res.status === 200) {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        <h1>Profile</h1>

        <p>{JSON.stringify(user)}</p>

        <button
          onClick={deleteAccount}
          className="font-medium text-white block bg-red-600 hover:bg-red-700 focus:bg-red-700 py-1.5 px-4 rounded-md text-center max-w-fit self-center"
        >
          Delete Account
        </button>
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
