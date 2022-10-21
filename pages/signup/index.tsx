import type { NextPage } from "next";
import Head from "next/head";
import MyForm from "components/Form";
import useSignUpForm from "hooks/useSignUpForm";

const Signup: NextPage = () => {
  const { formController, globalErrorMessage } = useSignUpForm();

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
          <MyForm.Form onSubmit={formController.handleSubmit}>
            <MyForm.Input
              label="Name"
              name="name"
              type="name"
              id="name"
              placeholder="Enter your name"
              onChange={formController.handleChange}
              value={formController.values.name}
              error={formController.errors.name}
              touched={formController.touched.name}
              setTouched={() =>
                formController.setFieldTouched("name", true, true)
              }
              required
            />
            <MyForm.Input
              label="Email"
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={formController.handleChange}
              value={formController.values.email}
              error={formController.errors.email}
              touched={formController.touched.email}
              setTouched={() =>
                formController.setFieldTouched("email", true, true)
              }
              required
            />
            <MyForm.Input
              label="Username"
              name="username"
              type="username"
              id="username"
              placeholder="Enter a username"
              onChange={formController.handleChange}
              value={formController.values.username}
              error={formController.errors.username}
              touched={formController.touched.username}
              setTouched={() =>
                formController.setFieldTouched("username", true, true)
              }
              required
            />
            <MyForm.Input
              label="Password"
              name="password"
              type="password"
              id="password"
              placeholder="Enter a password"
              onChange={formController.handleChange}
              value={formController.values.password}
              error={formController.errors.password}
              touched={formController.touched.password}
              setTouched={() =>
                formController.setFieldTouched("password", true, true)
              }
              required
            />
            <MyForm.Submit value="Sign up" />
            <MyForm.ErrorMessage>{globalErrorMessage}</MyForm.ErrorMessage>
          </MyForm.Form>
        </MyForm.Card>
      </div>
    </>
  );
};

export default Signup;
