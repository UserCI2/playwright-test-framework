import {
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  test as baseTest
} from '@playwright/test';
import uniqid from 'uniqid';
import { LoginPage } from '../pagesAndLocators/loginPage/LoginPage';
import { GeneralPage } from '../pagesAndLocators/generalPage/GeneralPage';
import { UserDataFixture } from '../dataFixtures/loginFixtures/loginFixutres';

export type Pages = {
  loginPage: LoginPage;
  generalPage: GeneralPage;
  loginDataFixture: UserDataFixture;
};

export type Fixtures = {
  loginDataFixture: UserDataFixture;
};

type TestFunction = (
  page: PlaywrightTestArgs &
    PlaywrightTestOptions &
    Pages &
    Fixtures &
    PlaywrightWorkerArgs &
    PlaywrightWorkerOptions
) => Promise<void>;

export interface ICaseInfo {
  title: string;
  maintainers: string[];
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  keywords?: string[];
  id?: string;
  ids?: string[];
  docs?: string[];
  siteEnv?: string;
  skipBy?: string;
  browser?: string;
}

interface OptionsForStep {
  takeScreenshot: boolean;
}

let testInfoGlobal;
let pageGlobal;
const test = baseTest.extend<Pages>({
  loginPage: async ({ page }, use, testInfo) => {
    testInfoGlobal = testInfo;
    pageGlobal = page;
    await use(new LoginPage(page, testInfo));
  },
  generalPage: async ({ page }, use, testInfo) => {
    await use(new GeneralPage(page, testInfo));
  },
  loginDataFixture: async ({}, use) => {
    await use(new UserDataFixture());
  }
});

export function Case(info: ICaseInfo, testFunc: TestFunction) {
  info.ids = info.ids ? info.ids : [info.id];
  info.ids = info.ids ? info.ids : [info.id];
  info.siteEnv = info.siteEnv || process.env.siteEnv;
  console.log(`case id: ${info.ids.join(',')}`);
  if (info.skipBy) {
    for (const caseId of info.ids) {
      console.log(`${caseId}\tSkipped\t${info.skipBy}`);
    }
    return;
  }
  (async () => {
    await test(info.title, testFunc);
  })();
}

function step(
  title: string,
  body: () => Promise<void>,
  options?: OptionsForStep
): Promise<void> {
  return test.step(title, async () => {
    await body();
    if (options.takeScreenshot) {
      const screenshot = await pageGlobal.screenshot({ fullPage: true });
      await testInfoGlobal.attach(
        `${testInfoGlobal.title.replace(/\s/g, '')}_${uniqid()}`,
        {
          contentType: 'image/png',
          body: screenshot
        }
      );
    }
  });
}

export { test, step };
