"use client";

import deleteUser from "auth/deleteUser";
import MyForm from "components/Form";
import { useAuthContext } from "hooks/useAuthContext";
import useGoTo from "hooks/useGoTo";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";

/**
 * @Path /profile
 */
const Profile: NextPage = () => {
  const { user, isLoading } = useAuthContext();
  const goToHome = useGoTo("/");

  const deleteAccount = async () => {
    if (!user) return;
    await deleteUser(user);
  };

  useEffect(() => {
    if (user == null && !isLoading) goToHome();
  }, [user, isLoading]);

  const { displayName, email, photoURL } = user ?? {};

  const profileImageURL = (photoURL || "").replace("s96-c", "s400-c");

  return (
    <>
      <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
        <MyForm.Card>
          <MyForm.Title>Profile</MyForm.Title>
          <p>{displayName}</p>
          <p>{email}</p>
          <Image
            src={profileImageURL}
            width={90}
            height={90}
            alt="Profile Image"
            className="rounded-full"
          />

          <button
            type="button"
            onClick={deleteAccount}
            className="font-bold bg-red-600 hover:bg-red-700 focus:bg-red-700 rounded-xl text-center h-11 mt-2 mb-1 w-40"
          >
            Delete Account
          </button>
        </MyForm.Card>
      </div>
    </>
  );
};

export default Profile;
