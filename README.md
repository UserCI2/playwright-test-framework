# Playwright Test Framework


#### A powerful and flexible testing framework for end-to-end testing using Playwright.



## Installation
1. Clone the repository:
  ```sh
  git clone https://github.com/UserCI2/playwright-test-framework.git
  ```
2. Install dependencies:
  ```sh
  npm install
  ```
3. Create a .env file in the root directory of the project, with the following contents:
```sh
SITE_URL=https://dev.omni-dispatch.com
SITE_ENV="" // specify env here
HEADLESS=true
RETRY=0 # specify here how many failed tests will be re-run
TESTMATCH=**.spec.ts # specify here which tests to run
CI=false # run on ci
  ```
4. Install Playwright:
```sh
npx playwright install
  ```
## Running Tests
To run tests, execute the following command:
```sh
npm run run:ci
  ```