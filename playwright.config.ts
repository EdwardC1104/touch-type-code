import { defineConfig } from "@playwright/test";

// Configuration for the "playwright test" command which is used for e2e tests
export default defineConfig({
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  testMatch: [
    "**/*.e2e.test.ts",
    "**/*.e2e.test.tsx",
    "**/*.e2e.test.js",
    "**/*.e2e.test.jsx",
  ],
});
