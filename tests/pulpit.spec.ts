import { test, expect } from '@playwright/test';

test.describe('Pulpit Demobank tests ', () => {
  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const base_url = 'https://demo-bank.vercel.app';
    const userId = 'testerLO';
    const userPassword = '87iokjhn';

    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    await page.goto(base_url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    //await page.locator('#execute_btn').click(); //different way of using specific element via locator
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });
  test('quick payment with incorrect data', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('87iokjhn');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_transfer_receiver').selectOption('2');
    await page.locator('#widget_1_transfer_amount').fill('150');
    await page.locator('#widget_1_transfer_title').fill('pizza');

    await page.locator('#execute_btn').click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza',
    );
  });
  test('successful mobile topup with fill amount', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('87iokjhn');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('503 xxx xxx');
    await page.locator('#widget_1_topup_amount').fill('50');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 50,00PLN na numer 503 xxx xxx',
    );
  });
  test.skip('successful mobile topup with select amount', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app');
    await page.getByTestId('login-input').fill('testerLO');
    await page.getByTestId('password-input').fill('87iokjhn');
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption('504 xxx xxx');
    await page.locator('#widget_1_topup_amount').selectOption('100');
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(
      'Doładowanie wykonane! 100,00PLN na numer 504 xxx xxx',
    );
  });
});
