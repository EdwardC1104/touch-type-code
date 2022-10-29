import MyForm from "components/Form";
import type { NextPage } from "next";
import Head from "next/head";
import useLoginForm from "hooks/formControllers/useLoginForm";

const Login: NextPage = () => {
  const { formController, globalErrorMessage } = useLoginForm();

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
          <MyForm.Form onSubmit={formController.handleSubmit}>
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

export default Login;
