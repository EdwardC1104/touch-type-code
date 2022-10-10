import MyForm from "components/Form";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  csrfToken: string;
}

const Login: NextPage<Props> = ({ csrfToken }) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(`\u00a0`);

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

          {/* <MyForm.SSO
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
              // signIn("github", { callbackUrl: "/" });
            }}
          /> */}

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              setSubmitting(false);
              if (res.status === 200) {
                router.push("/courses");
              } else {
                const data = await res.json();
                setErrorMessage(data.error);
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
              <MyForm.ErrorMessage>{errorMessage}</MyForm.ErrorMessage>
            </Form>
          </Formik>
        </MyForm.Card>
      </div>
    </>
  );
};

export default Login;
