import { defineConfig, devices } from '@playwright/test';

const AUTH_FILE = 'auth.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],

  globalSetup: require.resolve('./src/setup/global.setup.ts'),
  use: {
    baseURL: 'https://www.saucedemo.com/',
    storageState: AUTH_FILE,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /login\.spec\.ts/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: /login\.spec\.ts/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: /login\.spec\.ts/,
    },
    {
      name: 'setup',
      testMatch: /login\.spec\.ts/,
      use: {
        storageState: undefined,
      },
    },
  ],
  outputDir: 'test-results/',
});
