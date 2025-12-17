import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",

  timeout: 30 * 1000,

  retries: 0,

  reporter: [
    ["list"], // console output
    ["allure-playwright"] // 👈 Allure
  ],

  use: {
    trace: "on-first-retry"
  }
});
