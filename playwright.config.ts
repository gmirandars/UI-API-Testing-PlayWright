// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

const AUTH_FILE = 'auth.json';

export default defineConfig({
  globalSetup: require.resolve('./src/setup/global.setup.ts'),
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'https://saucedemo.com/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    storageState: AUTH_FILE,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'setup',
      testMatch: /login\.spec\.ts/,
    },
  ],
  outputDir: 'test-results/',
});
