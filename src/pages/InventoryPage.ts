// src/pages/InventoryPage.ts

import { type Page, type Locator, expect } from '@playwright/test';
import { Product } from '../interfaces';

/**
 * Represents the SauceDemo Inventory (Products) Page.
 * Encapsulates all locators, actions, and assertions for the page
 * displayed after a successful login.
 */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryList: Locator;
  readonly cartLink: Locator;

  /**
   * Initializes a new instance of the InventoryPage.
   * @param {Page} page - The Playwright Page object provided by the test.
   */
  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title', { hasText: 'Products' });
    this.inventoryList = page.locator('.inventory_list');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  /**
   * Returns the "Add to cart" button locator for a specific product.
   * @param {Product} product - The product object to find the button for.
   * @returns {Locator}
   */
  private getAddItemButton(product: Product): Locator {
    return this.page.locator(`[data-test="${product.id}"]`);
  }

  /**
   * Asserts that the main elements of the inventory page (Title and List)
   * are visible, confirming a successful navigation.
   */
  async expectTitleToBeVisible() {
    await expect(this.title).toBeVisible();
    await expect(this.inventoryList).toBeVisible();
  }

  /**
   * Asserts that the current page URL is the inventory page path.
   */
  async expectToBeOnInventoryPage() {
    await expect(this.page).toHaveURL('/inventory.html');
  }

  /**
   * Asserts that the current page URL is NOT the inventory page path.
   * This is useful for negative tests (e.g., failed login).
   */
  async expectToNotBeOnInventoryPage() {
    await expect(this.page).not.toHaveURL('/inventory.html');
  }

  /**
   * Adds a specific product to the cart.
   * @param {Product} product - The product object to add.
   */
  async addItemToCart(product: Product) {
    await this.getAddItemButton(product).click();
  }

  /**
   * Clicks the shopping cart icon to navigate to the cart page.
   */
  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html');
  }
}
