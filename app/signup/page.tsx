"use client";

import sso from "auth/sso";
import MyForm from "components/Form";
import useGoTo from "hooks/useGoTo";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

/**
 * @Path /signup
 */
const Signup: NextPage = () => {
  const goToCourses = useGoTo("/courses");

  const [globalError, setGlobalError] = useState<string | null>(null);

  const signUpWithSSO = async (provider: string) => {
    const { error } = await sso(provider);
    if (error) setGlobalError(error);
    else {
      setGlobalError(null);
      goToCourses();
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
        <MyForm.Card>
          <MyForm.Title>Sign up</MyForm.Title>
          <MyForm.Subtitle>
            Select the service you wish to sign up with.
          </MyForm.Subtitle>
          <MyForm.SSO
            text="Sign up with Google"
            icon={
              <Image
                src="/google.png"
                alt="Google logo"
                width={20}
                height={20}
                className="self-center"
              />
            }
            onClick={() => signUpWithSSO("google.com")}
          />
          <MyForm.SSO
            text="Sign up with GitHub"
            icon={
              <Image
                src="/github.png"
                alt="GitHub logo"
                width={20}
                height={20}
                className="self-center"
              />
            }
            onClick={() => signUpWithSSO("github.com")}
          />
          <MyForm.ErrorMessage>{globalError}</MyForm.ErrorMessage>
        </MyForm.Card>
      </div>
    </>
  );
};

export default Signup;
