# swaglabs-gui-tests

Automated end-to-end GUI tests for the SwagLabs website.

## How to run

This uses [WebdriverIO v6](https://webdriver.io) as the automation framework to run the tests, paired with the Mocha test framework and Chai for easy BDD assertions. It hooks into [Chromedriver](https://chromedriver.chromium.org) to control the browser.

### Prerequisites

- Google Chrome (set to use version 88; any other version installed may not work)
- Node.js: I used (and only tested on) v15.8.0, with npm v7.5.0.

### Test instructions

1. Clone this repository (`git clone https://github.com/Jmcosel/swaglabs-gui-tests.git`)
2. Navigate to the root of the folder and install the npm dependencies (`npm install`)
3. Run the tests with the following command: `npx wdio wdio.config.js`
