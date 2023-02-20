import { defineConfig, devices } from '@playwright/test';

// Read environment variables from file => https://github.com/motdotla/dotenv
//require('dotenv').config();

export default defineConfig({
  // Test directory
  testMatch: ["tests/example.spec.ts"],
  //testDir: './tests',

  // Location of the output files generated when scripts fails or execution results
  outputDir: "./test-output/test-results/",

  //Maximum time one test can run for.
  timeout: 30 * 1000,

  // Maximum time expect() should wait for the condition to be met.
  expect: {
    timeout: 5000
  },

  // Number of retries if the Test Case fails
  retries: 0,

  // Run tests in files in parallel
  fullyParallel: true,

  // Reporters to use 
  reporter: [
    ['html', {open: 'never', outputFolder: './test-output/html/'}],
    ['list'],
    ['junit', {outputFile: './test-output/junit/results-junit.xml'}]
  ],

  // Shared settings for all the projects below.
  use: {
    // Maximum time each action such as `click()` can take.
    actionTimeout: 0,

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    // Browser options
    headless: true,

    // Context options 
    viewport: {width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,

    // Artifacts
    screenshot: 'only-on-failure',
    //video: 'retain-on-failure',
    //trace: 'retry-with-trace',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  // Global Set up
  //globalSetup: "src/utils/globalSetup.ts"
});