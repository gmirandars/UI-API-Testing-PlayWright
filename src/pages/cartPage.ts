// src/pages/CartPage.ts
import { type Page, type Locator, expect } from '@playwright/test';
import { Product } from '../interfaces';

/**
 * Represents the Shopping Cart Page.
 */
export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /**
   * Returns a locator for an item in the cart by its name.
   * @param {Product} product - The product object to find.
   * @returns {Locator}
   */
  private getItemByName(product: Product): Locator {
    return this.page.locator('.inventory_item_name', { hasText: product.name });
  }

  /**
   * Asserts that a specific item is visible in the cart.
   * @param {Product} product - The product object to check for.
   */
  async expectItemInCart(product: Product) {
    await expect(this.getItemByName(product)).toBeVisible();
  }

  /**
   * Clicks the "Checkout" button to proceed.
   */
  async goToCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }
}
