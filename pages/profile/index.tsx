import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Profile: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        <h1>Profile</h1>

        <p>{JSON.stringify(session)}</p>

        <p>
          <Link href="profile/delete">delete</Link>
        </p>
      </div>
    </>
  );
};

export default Profile;
