import MyForm from "@components/Form";
import type { GetServerSideProps, NextPage } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useRouter } from "next/router";

interface Props {
  csrfToken: string;
}

const Login: NextPage<Props> = ({ csrfToken }) => {
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
                placeholder="Enter your username"
                className={`rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all ${
                  false ? "mb-10" : "mb-5"
                }`}
              />
              <MyForm.Label htmlFor="password">Password</MyForm.Label>
              <Field
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
                className={`rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all ${
                  true ? "mb-10" : "mb-5"
                }`}
              />

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