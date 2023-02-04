import { expect, test } from "@playwright/test";

test("should let user sign up for an account, logout, and then login with the same account", async ({
  page,
}) => {
  const randomString = Math.random().toString(36).substring(7);

  // --------------------- SIGN UP ---------------------

  await page.goto("http://localhost:3000/signup");

  // expect page to have a h1 with the text "Sign up"
  await expect(page.locator("h1")).toContainText("Sign up");

  // fill in the form
  await page.fill("input[name=name]", "ETwoE");
  await page.fill("input[name=email]", `e2etesting${randomString}@example.com`);
  await page.fill("input[name=username]", `Test${randomString}`);
  await page.fill("input[name=password]", `E2E@${randomString}`);

  // click the submit button
  await page.click("input[type=submit]");

  // expect I am redirected to the courses page
  await expect(page).toHaveURL("http://localhost:3000/courses");

  // --------------------- LOGOUT ---------------------

  // click the logout button
  await page.getByText("Logout").click();

  // expect that the logout button is no longer visible
  await expect(page.locator("text=Logout")).toBeHidden();

  // --------------------- LOGIN ---------------------

  // click the login button
  await page.click("text=Login");

  // expect page to have a h1 with the text "Login"
  await expect(page.locator("h1")).toContainText("Login");

  // fill in the form
  await page.fill("input[name=username]", `Test${randomString}`);
  await page.fill("input[name=password]", `E2E@${randomString}`);

  // click the submit button
  await page.click("input[type=submit]");

  // expect I am redirected to the courses page
  await expect(page).toHaveURL("http://localhost:3000/courses");

  // --------------------- LOGOUT ---------------------

  // click the logout button
  await page.getByText("Logout").click();

  // expect that the logout button is no longer visible
  await expect(page.locator("text=Logout")).toBeHidden();
});
