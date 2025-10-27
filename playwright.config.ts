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

  use: {},

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com/',
        storageState: AUTH_FILE,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
      },
      testMatch: /UI\/.*\.spec\.ts/,
      testIgnore: /UI\/Login\.spec\.ts/,
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://www.saucedemo.com/',
        storageState: AUTH_FILE,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
      },
      testMatch: /UI\/.*\.spec\.ts/,
      testIgnore: /UI\/Login\.spec\.ts/,
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://www.saucedemo.com/',
        storageState: AUTH_FILE,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
      },
      testMatch: /UI\/.*\.spec\.ts/,
      testIgnore: /UI\/Login\.spec\.ts/,
      dependencies: ['setup'],
    },
    {
      name: 'api-tests',
      testMatch: /API\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://reqres.in/api',
        storageState: undefined,
        extraHTTPHeaders: {},
        screenshot: 'off',
        video: 'off',
        trace: 'off',
      },
    },
    {
      name: 'setup',
      testMatch: /UI\/Login\.spec\.ts/,
      use: {
        baseURL: 'https://www.saucedemo.com/',
        storageState: undefined,
      },
      teardown: 'cleanup auth',
    },
    {
      name: 'cleanup auth',
      testMatch: /global\.teardown\.ts/,
    },
  ],
  outputDir: 'test-results/',
});
