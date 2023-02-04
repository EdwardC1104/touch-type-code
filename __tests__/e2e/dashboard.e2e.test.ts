import { expect, test } from "@playwright/test";

test("should display the correct data on the dashboard", async ({ page }) => {
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

  // pick the first course
  await page.click("text=Begin");

  await page.waitForLoadState("networkidle");

  // pick the first lesson
  await page.click("text=Begin");

  // ---------------- TOUCH TYPING LESSON -----------------

  let codeSnippet = await page.locator("pre").innerText();
  codeSnippet = codeSnippet.replace(/ (\r\n|\r|\n)/g, "\n");
  codeSnippet = codeSnippet.replace(/  /g, "");
  const codeSnippetLetterArray = codeSnippet.split("");

  for (let letter of codeSnippetLetterArray) {
    if (letter === " ") letter = "Space";
    if (letter === "\n") letter = "Enter";
    if (letter === "\t") letter = "Tab";

    await page.press("body", letter, { delay: 50 });
  }

  // expect a redirect to the results page
  await expect(page).toHaveURL("http://localhost:3000/results");
  // --------------------- DASHBOARD ---------------------

  // click the dashboard link
  await page.click("text=Dashboard");

  await page.waitForLoadState("networkidle");

  // expect to be redirected to the dashboard page
  await expect(page).toHaveURL("http://localhost:3000/dashboard");

  await page.waitForTimeout(1000);

  // expect the dashboard page to have the correct sections
  await expect(page.locator("h2", { hasText: "Streak" })).toBeVisible();
  await expect(page.locator("h2", { hasText: "Days Active" })).toBeVisible();
  await expect(page.locator("h2", { hasText: "Speed" })).toBeVisible();
  await expect(page.locator("h2", { hasText: "Average Rating" })).toBeVisible();
  await expect(page.locator("h2", { hasText: "Completed" })).toBeVisible();
  await expect(page.locator("h2", { hasText: "Accuracy" })).toBeVisible();

  // expect the dashboard page to have the correct data
  await expect(page.getByText("1 days")).toHaveCount(2);
  await expect(page.getByText("1 lessons")).toBeVisible();
  await expect(page.getByText("100 %")).toBeVisible();
});
