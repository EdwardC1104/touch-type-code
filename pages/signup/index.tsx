import type { NextPage } from "next";
import Head from "next/head";
import MyForm from "@components/Form";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";

const Signup: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className="flex justify-center items-center flex-auto flex-col sm:bg-transparent ">
        <MyForm.Card>
          <MyForm.Title>Sign up</MyForm.Title>
          <MyForm.Subtitle>
            Enter your credentials to create an account.
          </MyForm.Subtitle>

          <Link href="/api/auth/signin">
            <MyForm.SSO
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

          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
              name: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              const json = await res.json();

              console.log(res, json);

              const { ok } = res;

              setSubmitting(false);
              if (ok) {
                router.push("/login");
              } else {
                alert(JSON.stringify(json));
              }
            }}
          >
            <Form>
              <MyForm.Label htmlFor="name">Name</MyForm.Label>
              <Field
                required
                type="name"
                name="name"
                id="name"
                placeholder="Enter your full name"
                className={`rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all ${
                  false ? "mb-10" : "mb-5"
                }`}
              />
              <MyForm.Label htmlFor="email">Email</MyForm.Label>
              <Field
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className={`rounded-xl border border-neutral-600 py-2 flex justify-center align-center px-3 bg-neutral-900 w-full text-neutral-400 placeholder:text-neutral-600 text-sm font-medium h-11 focus:outline-none focus:border-green-500 focus:border-1 focus:ring-green-500 focus:ring-1 transition-all ${
                  false ? "mb-10" : "mb-5"
                }`}
              />
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
              <input
                type="submit"
                className="font-bold bg-green-600 hover:bg-green-700 focus:bg-green-700 rounded-xl text-center w-full h-11"
                value={"Sign up"}
              />
            </Form>
          </Formik>
        </MyForm.Card>
      </div>
    </>
  );
};

export default Signup;
