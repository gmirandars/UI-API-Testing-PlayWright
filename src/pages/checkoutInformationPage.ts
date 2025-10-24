import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Represents the Checkout Step One Page (Shipping Information).
 */
export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Fills the shipping information form.
   * @param {string} firstName - The user's first name.
   * @param {string} lastName - The user's last name.
   * @param {string} zipCode - The user's zip/postal code.
   */
  async fillShippingInfo(firstName: string, lastName: string, zipCode: string) {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (zipCode) await this.zipCodeInput.fill(zipCode);
  }

  /**
   * Click on continue on checkout information page
   */
  async clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Asserts that the error message is visible and contains the expected text.
   * @param {string} expectedMessage - The partial or full text expected.
   */
  async expectErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }
}
