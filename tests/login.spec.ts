import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test(
    'successful login with correct credentials',
    {
      tag: ['@login', '@smoke'],
      annotation: {
        type: 'Happy path',
        description: 'Basic happy path test for login to DemoBank',
      },
    },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = loginData.userPassword;
      const expectedUserName = 'Jan Demobankowy';

      // Act
      await loginPage.login(userId, userPassword);

      // Assert
      const pulpitPage = new PulpitPage(page);
      await expect(pulpitPage.userNameText).toHaveText(expectedUserName);
    },
  );

  test(
    'unsuccessful login with too short username',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const incorrectUserId = 'tester';
      const expectedResponse = 'identyfikator ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(incorrectUserId);
      await loginPage.passwordInput.click();

      // Assert
      await expect(loginPage.loginError).toHaveText(expectedResponse);
    },
  );

  test(
    'unsuccessful login with too short password',
    { tag: '@login' },
    async ({ page }) => {
      // Arrange
      const userId = loginData.userId;
      const userPassword = '12312';
      const expectedResponse = 'hasło ma min. 8 znaków';

      // Act
      await loginPage.loginInput.fill(userId);
      await loginPage.passwordInput.fill(userPassword);
      await loginPage.passwordInput.blur();

      // Assert
      await expect(loginPage.passwordError).toHaveText(expectedResponse);
    },
  );
});
