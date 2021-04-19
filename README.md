# swaglabs-gui-tests

## Summary

Automated end-to-end GUI tests for SauceLabs' "SwagLabs" test website, mainly to play around with a simple [WebdriverIO v7](https://webdriver.io) automation framework setup. WDIO is both the test runner and asserter, paired with the Mocha test framework. It additionally hooks into [Chromedriver](https://chromedriver.chromium.org) to control the browser.

Whatever tests are skipped are either ones that I haven't yet written, or are very similar to another in execution (but is a good idea to make note of when doing manual testing).

## Prerequisites

- Google Chrome (last tested with version 90)
- Node.js (last tested with version 15.11.0)

## How to run tests

1. Clone this repository (`git clone https://github.com/Jmcosel/swaglabs-gui-tests.git`)
2. Navigate to the root of the folder and install the npm dependencies (`cd swaglabs-gui-tests && npm i`)
3. Run all tests with the following command: `npx wdio wdio.config.js`
4. Append `--spec` followed by the file path for a `.spec.js` file to just run that file.
5. If you wish for a debugging experience, add `DEBUG=true` as an environment variable to the above command
