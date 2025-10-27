import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Represents the SauceDemo Login Page.
 * Encapsulates all locators, actions, and assertions related to the login process.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  /**
   * Initializes a new instance of the LoginPage.
   * @param {Page} page - The Playwright Page object provided by the test.
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page (the base URL).
   */
  async navigateTo() {
    await this.page.goto('/');
  }

  /**
   * Fills the username and password fields and submits the login form.
   * @param {string} username - The username to fill.
   * @param {string} password - The password to fill.
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Asserts that the error message is visible and contains the expected text.
   * @param {string} expectedMessage - The partial or full text expected to be in the error message.
   */
  async expectErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /**
   * Asserts that the current page URL is the login page (the base URL path).
   */
  async expectToBeOnLoginPage() {
    await expect(this.page).toHaveURL('/');
  }
}
