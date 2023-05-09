import { CommonPage } from '../CommonPage';
import { LoginPageLocators } from './LoginPageLocators';
import { UserData } from '../../dataFixtures/loginFixtures/loginFixutres';

export class LoginPage extends CommonPage {
  baseLocator = this.page.locator('html');

  get email() {
    return this.baseLocator.locator(LoginPageLocators.email);
  }

  get password() {
    return this.baseLocator.locator(LoginPageLocators.password);
  }

  get logInButton() {
    return this.baseLocator.locator(LoginPageLocators.logInButton);
  }

  get forgotPassword() {
    return this.baseLocator.locator(LoginPageLocators.forgotPasswordButton);
  }

  get wrongEmailOrPassword() {
    return this.baseLocator.locator(LoginPageLocators.wrongEmailOrPassword);
  }

  get wrongEmailOrPasswordColor() {
    return this.baseLocator.locator(
      LoginPageLocators.wrongEmailOrPasswordColor
    );
  }

  async login(credentials: UserData) {
    await this.navigateTo('/');
    await this.email.waitFor({ state: 'visible', timeout: 15e3 });
    await this.email.type(credentials.email);
    await this.password.type(credentials.password);
    await this.logInButton.click();
  }
}
