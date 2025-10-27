import { test, expect } from '@playwright/test'; // <-- Importa o 'expect'
import { clientBuilder } from '../../src/builders/UI/ClientBuilder';
import { PRODUCTS } from '../../src/data/UI/Products';
import { ClientInfo, Product } from '../../src/interfaces/UI';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutCompletePage } from '../../src/pages/CheckoutCompletePage';
import { CheckoutStepOnePage } from '../../src/pages/CheckoutInformationPage';
import { CheckoutStepTwoPage } from '../../src/pages/CheckoutOverview';
import { InventoryPage } from '../../src/pages/InventoryPage';

let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutStepOne: CheckoutStepOnePage;
let checkoutStepTwo: CheckoutStepTwoPage;
let checkoutComplete: CheckoutCompletePage;
let clientInfo: ClientInfo;
let product: Product;

test.beforeAll(async () => {
  clientInfo = clientBuilder.buildClient();
  product = PRODUCTS.BACKPACK;
});

test.beforeEach(async ({ page }) => {
  inventoryPage = new InventoryPage(page);
  cartPage = new CartPage(page);
  checkoutStepOne = new CheckoutStepOnePage(page);
  checkoutStepTwo = new CheckoutStepTwoPage(page);
  checkoutComplete = new CheckoutCompletePage(page);
  await page.goto('/inventory.html');
  await inventoryPage.addItemToCart(product);
  await inventoryPage.goToCart();
  await cartPage.expectItemInCart(product);
  await cartPage.goToCheckout();
  await expect(page).toHaveURL('/checkout-step-one.html');
});

test.describe('E2E Checkout Flow', () => {
  test('should allow a user to purchase an item', async () => {
    await checkoutStepOne.fillShippingInfo(
      clientInfo.firstName,
      clientInfo.lastName,
      clientInfo.zipCode,
    );
    await checkoutStepOne.clickContinue();
    await checkoutStepTwo.expectItemInOverview(product);
    await checkoutStepTwo.finishCheckout();
    await checkoutComplete.expectOrderToBeSuccessful();
  });

  test('should display an error when First Name is missing', async () => {
    await checkoutStepOne.fillShippingInfo('', clientInfo.lastName, clientInfo.zipCode);
    await checkoutStepOne.clickContinue();
    await checkoutStepOne.expectErrorMessage('Error: First Name is required');
  });

  test('should display an error when Last Name is missing', async () => {
    await checkoutStepOne.fillShippingInfo(clientInfo.firstName, '', clientInfo.zipCode);
    await checkoutStepOne.clickContinue();
    await checkoutStepOne.expectErrorMessage('Error: Last Name is required');
  });

  test('should display an error when Postal Code is missing', async () => {
    await checkoutStepOne.fillShippingInfo(clientInfo.firstName, clientInfo.lastName, '');
    await checkoutStepOne.clickContinue();
    await checkoutStepOne.expectErrorMessage('Error: Postal Code is required');
  });
});
