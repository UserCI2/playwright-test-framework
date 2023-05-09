import { Case } from '../../../lib/setupBaseTest';
import { step } from '../../../lib/setupBaseTest';
import { expect } from '@playwright/test';
import { WhichInvalid } from '../../../dataFixtures/loginFixtures/loginFixutres';

Case(
  {
    title: 'Login with valid data Success',
    ids: ['JPT-3123'],
    maintainers: ['vladyslav.bondariev'],
    priority: 'P0',
    keywords: []
  },
  async ({ loginPage, generalPage, loginDataFixture }) => {
    const loginData = loginDataFixture.validLoginData();
    await step(
      'When I login with valid data to app',
      async () => {
        await loginPage.login(loginData);
      },
      { takeScreenshot: true }
    );

    await step(
      'Then I should see welcome page',
      async () => {
        await expect(generalPage.footerCopyRight).toBeVisible({
          timeout: 5000
        });
      },
      { takeScreenshot: true }
    );
  }
);

Case(
  {
    title: 'Login with invalid data failed',
    ids: ['JPT-3124'],
    maintainers: ['vladyslav.bondariev'],
    priority: 'P0',
    keywords: []
  },
  async ({ loginPage, loginDataFixture }) => {
    const dataInvalid: WhichInvalid[] = [
      'invalidPass',
      'invalidEmail',
      'invalidPassAndEmail'
    ];
    for (let i = 0; i <= 2; i++) {
      await step(
        `When I login with ${dataInvalid[i]} to app`,
        async () => {
          await loginPage.login(loginDataFixture.invalidData(dataInvalid[i]));
        },
        { takeScreenshot: true }
      );

      await step(
        'Then I should see error',
        async () => {
          await expect(loginPage.wrongEmailOrPassword).toBeVisible({
            timeout: 5000
          });
          const wrongEmailOrPasswordColor = loginPage.wrongEmailOrPasswordColor;
          const color = await wrongEmailOrPasswordColor.evaluate((el) => {
            return window.getComputedStyle(el).getPropertyValue('color');
          });
          await expect(color).toBe('rgb(255, 82, 82)');
        },
        { takeScreenshot: true }
      );
    }
  }
);
