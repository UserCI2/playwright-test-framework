import * as config from "./src/runtime/config"
import { defineConfig } from '@playwright/test';


export default defineConfig({
    timeout: 60e3 * 20,
    testDir: (process.env.CI === undefined || Boolean(process.env.CI) === true) ? './dist/src' : './src',
    testMatch: config.default.testMatch,
    fullyParallel: true,
    forbidOnly: true,
    retries: config.default.retries,
    workers: 2,
    reporter: [['html'], ['list']],
    use: {
        baseURL: config.default.siteUrl,
        headless: config.default.headless,
        channel: config.default.channel,
        screenshot: 'only-on-failure',
        video: "retain-on-failure"
    },
});
