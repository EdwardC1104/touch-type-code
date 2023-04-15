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

  const profileImageURL = (photoURL || "").replace("s96-c", "s800-c");

  return (
    <>
      <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
        <MyForm.Card>
          <h1 className="font-bold text-2xl mb-4 text-center">{displayName}</h1>
          <div className="flex align-center justify-center mb-4">
            <Image
              src={profileImageURL}
              width={220}
              height={220}
              alt="Your profile image"
              className="rounded-full"
              quality={100}
            />
          </div>
          <p className="text-neutral-400 text-sm font-medium mb-6 text-center">
            {email}
          </p>
          <div className="flex align-center justify-center">
            <button
              type="button"
              onClick={deleteAccount}
              className="font-bold bg-red-600 hover:bg-red-700 focus:bg-red-700 rounded-xl text-center h-11 mb-1 w-40"
            >
              Delete Account
            </button>
          </div>
        </MyForm.Card>
      </div>
    </>
  );
};

export default Profile;
