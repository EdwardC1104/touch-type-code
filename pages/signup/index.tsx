import type { NextPage } from "next";
import Head from "next/head";

const Signup: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div>
        <h1>Sign up</h1>
        <form action="/api/auth/signup" method="post">
          <div>
            <label htmlFor="name">Name: </label>
            <input type="name" name="name" id="name" />
          </div>
          <div>
            <label htmlFor="username">Username: </label>
            <input type="username" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
