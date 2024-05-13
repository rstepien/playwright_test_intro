import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit Demobank tests ', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);

    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });
  test(
    'quick payment with correct data',
    { tag: ['@pulpit', '@smoke'] },
    async ({ page }) => {
      // Arrange
      const receiverId = '2';
      const transferAmount = '150';
      const transferTitle = 'pizza';
      const expectedTransferReceiver = 'Chuck Demobankowy';

      // Act
      await pulpitPage.executeQuickPayment(
        receiverId,
        transferAmount,
        transferTitle,
      );

      // Assert
      await expect(page.locator('#show_messages')).toHaveText(
        `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
      );
    },
  );
  test(
    'quick payment with incorrect data',
    { tag: '@pulpit' },
    async ({ page }) => {
      // Arrange
      const receiverId = '2';
      const transferAmount = '150';
      const transferTitle = 'pizza';
      const expectedTransferReceiver = 'Chuck Demobankowy';

      // Act
      await pulpitPage.executeQuickPayment(
        receiverId,
        transferAmount,
        transferTitle,
      );

      // Assert
      await expect(pulpitPage.confirmationMessage).toHaveText(
        `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
      );
    },
  );
  test(
    'successful mobile topup with fill amount',
    { tag: '@pulpit' },
    async ({ page }) => {
      // Arrange
      const receiverNumber = '503 xxx xxx';
      const transferAmount = '50';

      // Act
      await pulpitPage.executeMobileTopUp(receiverNumber, transferAmount);

      // Assert
      await expect(pulpitPage.confirmationMessage).toHaveText(
        `Doładowanie wykonane! ${transferAmount},00PLN na numer ${receiverNumber}`,
      );
    },
  );
  test(
    'correct balance after successful mobile topup with fill amount',
    { tag: '@pulpit' },
    async ({ page }) => {
      // Arrange
      const receiverNumber = '503 xxx xxx';
      const transferAmount = '50';
      const initialBalance = await pulpitPage.moneyValueText.innerText();
      const expectedBalance = Number(initialBalance) - Number(transferAmount);

      // Act
      await pulpitPage.executeMobileTopUp(receiverNumber, transferAmount);

      // Assert
      await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
    },
  );
});
