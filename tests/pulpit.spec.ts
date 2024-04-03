import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit Demobank tests ', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiverId.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitleInput.fill(transferTitle);

    await pulpitPage.transferButton.click();
    await pulpitPage.transferPopupButton.click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });
  test('quick payment with incorrect data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiverId.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitleInput.fill(transferTitle);

    await pulpitPage.transferButton.click();
    await pulpitPage.transferPopupButton.click();

    // Assert
    await expect(pulpitPage.confirmationMessage).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });
  test('successful mobile topup with fill amount', async ({ page }) => {
    // Arrange
    const receiverNumber = '503 xxx xxx';
    const transferAmount = '50';

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topupReceiverNumber.selectOption(receiverNumber);
    await pulpitPage.topupTransferAmount.fill(transferAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupButton.click();
    await pulpitPage.topupPopupButton.click();

    // Assert
    await expect(pulpitPage.confirmationMessage).toHaveText(
      `Doładowanie wykonane! ${transferAmount},00PLN na numer ${receiverNumber}`,
    );
  });
  test('correct balance after successful mobile topup with fill amount', async ({
    page,
  }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const receiverNumber = '503 xxx xxx';
    const transferAmount = '50';
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(transferAmount);

    // Act
    await pulpitPage.topupReceiverNumber.selectOption(receiverNumber);
    await pulpitPage.topupTransferAmount.fill(transferAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupButton.click();
    await pulpitPage.topupPopupButton.click();

    // Assert
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
