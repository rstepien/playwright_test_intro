import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment Demobank tests ', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');

    const loginPage = new LoginPage(page);

    await loginPage.login(userId, userPassword);

    paymentPage = new PaymentPage(page);

    await paymentPage.sideMenu.paymentButton.click();
  });

  test(
    'simple payment',
    {
      tag: ['@payment', '@smoke'],
      annotation: {
        type: 'Documentation',
        description: 'https://jaktestowac.pl/lesson/pw1s04l04/',
      },
    },
    async ({ page }) => {
      // Arrange
      const transferReceiver = 'Jan Nowak';
      const transferAccount = '12 3456 7890 1234 5678 9012 3456';
      const transferAmount = '222';
      const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

      // Act
      await paymentPage.makeTransfer(
        transferReceiver,
        transferAccount,
        transferAmount,
      );

      // Assert
      await expect(paymentPage.confirmationMessage).toHaveText(expectedMessage);
    },
  );
});
