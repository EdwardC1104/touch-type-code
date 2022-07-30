import type { NextPage } from "next";
import Head from "next/head";
import Form from "@components/Form";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
        <Form.Card>
          <Form.Title>Sign up</Form.Title>
          <Form.Subtitle>
            Enter your credentials to create an account.
          </Form.Subtitle>

          {/* <Form.SSO
            text="Sign up with Google"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  fill="#4285F4"
                  fillRule="evenodd"
                  d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
                  clipRule="evenodd"
                />
                <path
                  fill="#34A853"
                  fillRule="evenodd"
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
                  clipRule="evenodd"
                />
                <path
                  fill="#FBBC05"
                  fillRule="evenodd"
                  d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
                  clipRule="evenodd"
                />
                <path
                  fill="#EA4335"
                  fillRule="evenodd"
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          /> */}

          <Link href="/api/auth/signin">
            <Form.SSO
              text="Sign up with GitHub"
              icon={
                <Image
                  src="/github.png"
                  width={20}
                  height={20}
                  alt="GitHub Logo"
                  className="self-center"
                />
              }
              largeSpacing
              onClick={(e) => {
                e.preventDefault();
                signIn("github", { callbackUrl: "/" });
              }}
            />
          </Link>

          <Form.Form>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Input
              required
              type="name"
              name="name"
              id="name"
              placeholder="Enter your full name"
            />
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Input
              required
              type="username"
              name="username"
              id="username"
              placeholder="Enter a username"
            />
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter a password"
              largeSpacing
            />
            <Form.Submit value="Sign up" />
          </Form.Form>
        </Form.Card>
      </div>
    </>
  );
};

export default Signup;
