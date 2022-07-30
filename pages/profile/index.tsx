import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Profile: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        <h1>Profile</h1>

        <p>
          <Link href="profile/delete">delete</Link>
        </p>
      </div>
    </>
  );
};

export default Profile;
