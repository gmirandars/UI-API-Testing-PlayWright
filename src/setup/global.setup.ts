import { chromium, type FullConfig } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

/**
 * This setup runs once before all tests.
 * It logs in as a standard user and saves the browser's
 * authentication state (cookies, local storage) to a file.
 * This file is then used by tests to start already authenticated.
 */
async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL });

  try {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.waitForURL((url) => url.pathname === '/inventory.html');
    await page.context().storageState({ path: storageState as string });

    await browser.close();
    console.log(`Auth state saved to ${storageState}`);
  } catch (error) {
    await browser.close();
    console.error('Global setup failed:', error);
    throw error;
  }
}

export default globalSetup;
