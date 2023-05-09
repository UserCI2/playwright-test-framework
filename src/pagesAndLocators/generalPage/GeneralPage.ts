import { CommonPage } from '../CommonPage';
import { GeneralPageLocators } from './GeneralPageLocators';

export class GeneralPage extends CommonPage {
  baseLocator = this.page.locator('html');

  get footerCopyRight() {
    return this.baseLocator.locator(GeneralPageLocators.footerCopyright);
  }
}
