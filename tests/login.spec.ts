import { userBuilder } from '../src/builders/UserBuilder';
import { UserData } from '../src/interfaces';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/loginPage';
import { test } from '@playwright/test';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let validUserData: UserData;
  let lockedUserData: UserData;
  let invalidUserData: UserData;

  test.beforeAll(async () => {
    validUserData = userBuilder.buildValidUser();
    lockedUserData = userBuilder.buildLockedUser();
    invalidUserData = userBuilder.buildInvalidPasswordUser();
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigateTo();
  });

  test('should allow a user to log in with valid credentials', async () => {
    await loginPage.login(validUserData.userName, validUserData.password);
    await inventoryPage.expectToBeOnInventoryPage();
    await inventoryPage.expectTitleToBeVisible();
  });

  test('should display an error message for a locked-out user', async () => {
    await loginPage.login(lockedUserData.userName, lockedUserData.password);
    await loginPage.expectErrorMessage(lockedUserData.loginMessage);
    await loginPage.expectToBeOnLoginPage();
    await inventoryPage.expectToNotBeOnInventoryPage();
  });

  test('should display an error message for an incorrect password', async () => {
    await loginPage.login(invalidUserData.userName, invalidUserData.password);
    await loginPage.expectErrorMessage(invalidUserData.loginMessage);
    await loginPage.expectToBeOnLoginPage();
    await inventoryPage.expectToNotBeOnInventoryPage();
  });
});
