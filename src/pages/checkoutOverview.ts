import { type Page, type Locator, expect } from '@playwright/test';
import { Product } from '../interfaces';

/**
 * Represents the Checkout Step Two Page (Order Overview).
 */
export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
  }

  /**
   * Asserts that the item is present in the overview summary.
   * @param {Product} product - The product object to check for.
   */
  async expectItemInOverview(product: Product) {
    const itemLocator = this.page.locator('.inventory_item_name', { hasText: product.name });
    await expect(itemLocator).toBeVisible();
  }

  /**
   * Clicks the "Finish" button to complete the purchase.
   */
  async finishCheckout() {
    await this.finishButton.click();
    await this.page.waitForURL('/checkout-complete.html');
  }
}
