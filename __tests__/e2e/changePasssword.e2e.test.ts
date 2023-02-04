import { expect, test } from "@playwright/test";

test("should let user change their password", async ({ page }) => {
  const randomString = Math.random().toString(36).substring(7);

  // --------------------- SIGN UP ---------------------
  await page.goto("http://localhost:3000/signup");

  // fill in the form
  await page.fill("input[name=name]", "ETwoE");
  await page.fill("input[name=email]", `e2etesting${randomString}@example.com`);
  await page.fill("input[name=username]", `Test${randomString}`);
  await page.fill("input[name=password]", `E2E@${randomString}`);

  // click the submit button
  await page.click("input[type=submit]");

  // expect I am redirected to the courses page
  await expect(page).toHaveURL("http://localhost:3000/courses");

  // --------------------- NAVIGATE ---------------------

  // click the profile button
  await page.click("text=Profile");

  // expect to be redirected to the profile page
  await expect(page).toHaveURL("http://localhost:3000/profile");
  await page.waitForLoadState("networkidle");

  expect(page.locator("h1")).toContainText("Profile");

  // click the change password button
  await page.getByText("Change my password").click();

  // expect to be redirected to the change password page
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("http://localhost:3000/profile/change-password");

  // --------------------- CHANGE PASSWORD ---------------------

  // fill in the form
  await page.fill("input[name=password]", `E2E@${randomString}`);
  await page.fill("input[name=newPassword]", `E2E@${randomString}1`);

  // click the submit button
  await page.click("input[type=submit]");

  // expect I am redirected to the login page
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("http://localhost:3000/login");

  // --------------------- LOGIN ---------------------

  // fill in the form
  await page.fill("input[name=username]", `Test${randomString}`);
  await page.fill("input[name=password]", `E2E@${randomString}1`);

  // click the submit button
  await page.click("input[type=submit]");

  // expect I am redirected to the courses page
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL("http://localhost:3000/courses");
});
