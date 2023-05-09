import * as dotenv from 'dotenv';
dotenv.config();
const siteUrl: string = process.env.SITE_URL === undefined ? "https://dev.omni-dispatch.com/" : process.env.SITE_URL // default url
const siteEnv: string = process.env.SITE_ENV; // default env
const channel: string = process.env.CHANNEL === undefined ? "chrome" : process.env.CHANNEL; // chrome , msedge , chrome-beta , msedge-beta or msedge-dev
const retries: number = process.env.RETRY === undefined ? 0 : Number(process.env.RETRY); // specify here how much failed tests will be run
const headless: boolean = process.env.HEADLESS !== undefined // if true browser will not be open
const testMatch =
  process.env.TESTMATCH === undefined
    ? '**.spec.{js,ts}'
    : process.env.TESTMATCH === '**.spec.ts'
    ? '**.spec.ts'
    : process.env.TESTMATCH;
export default {
  siteEnv,
  siteUrl,
  channel,
  retries,
  headless,
  testMatch
};
