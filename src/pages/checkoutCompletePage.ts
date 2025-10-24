import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Represents the Checkout Complete Page (Order Confirmation).
 */
export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('.complete-header', {
      hasText: 'Thank you for your order!',
    });
  }

  /**
   * Asserts that the order success message is visible.
   */
  async expectOrderToBeSuccessful() {
    await expect(this.completeHeader).toBeVisible();
  }
}
