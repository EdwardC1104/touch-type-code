import MyForm from "@components/Form";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
        <MyForm.Card>
          <MyForm.Title>Login</MyForm.Title>
          <MyForm.Subtitle>
            Enter your credentials to access your account.
          </MyForm.Subtitle>
          {/* <Form.SSO
            text="Login with Google"
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

          <MyForm.SSO
            text="Login with GitHub"
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

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const res = await signIn("credentials", {
                callbackUrl: "/",
                redirect: false,
                ...values,
              });

              const { error, ok } = res;

              setSubmitting(false);
              if (ok) {
                router.push("/");
              } else {
                alert(error);
              }
            }}
          >
            <Form>
              <MyForm.Label htmlFor="username">Username</MyForm.Label>
              <Field
                required
                type="username"
                name="username"
                id="username"
                placeholder="Enter a username"
                className={`rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all ${
                  false ? "mb-10" : "mb-5"
                }`}
              />
              <MyForm.Label htmlFor="password">Password</MyForm.Label>
              <Field
                id="password"
                name="password"
                placeholder="Enter a password"
                type="password"
                required
                className={`rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all ${
                  true ? "mb-10" : "mb-5"
                }`}
              />

              {/* <MyForm.Submit value="Login" /> */}
              <input
                type="submit"
                className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center w-full h-11"
                value={"Login"}
              />
            </Form>
          </Formik>
        </MyForm.Card>
      </div>
    </>
  );
};

export default Login;
