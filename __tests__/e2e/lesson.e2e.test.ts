import { expect, test } from "@playwright/test";

test("should do a touch typing lesson", async ({ page }) => {
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

  // expect to be redirected to the course page
  await expect(page).toHaveURL(
    /(http:\/\/localhost:3000\/courses\/[A-z0-9]*)/gi
  );

  await page.waitForLoadState("networkidle");

  // pick the first lesson
  await page.click("text=Begin");

  // expect to be redirected to the lesson page
  await expect(page).toHaveURL(
    /(http:\/\/localhost:3000\/courses\/[A-z0-9]*\/[A-z0-9]*)/gi
  );

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

  // --------------------- RESULTS ---------------------

  // expect the results page to have a h2 with the text "Well done!!"
  await expect(page.locator("h1")).toContainText("Well done!!");

  // expect the results page to have a p with the text "100 %"
  await expect(page.getByText("100 %")).toBeVisible();

  // --------------------- CONTINUE ---------------------

  // click the continue button
  await page.click("text=Continue");

  // expect to be redirected to the course page
  await expect(page).toHaveURL(
    /(http:\/\/localhost:3000\/courses\/[A-z0-9]*)/gi
  );
});
