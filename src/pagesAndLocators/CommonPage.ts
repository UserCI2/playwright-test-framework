import { Locator, TestInfo } from '@playwright/test';
import { Page } from '@playwright/test';

export interface navigateOpt {
  referer?: string;
  timeout?: number;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
}
export abstract class CommonPage {
  public _page: Page;
  abstract baseLocator: Locator;
  testInfo: TestInfo;

  get page() {
    return this._page;
  }

  constructor(page: Page, testInfo?: TestInfo) {
    this._page = page;
    this.testInfo = testInfo;
  }

  async navigateTo(url: string, opt?: navigateOpt) {
    await this.page.goto(url, opt);
  }
}
