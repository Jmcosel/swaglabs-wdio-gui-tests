# swaglabs-gui-tests

## Introduction

Automated end-to-end GUI tests for the SwagLabs website. This uses [WebdriverIO v7](https://webdriver.io) as the automation framework to run the tests and provide easy assertions, paired with the Mocha test framework. It hooks into [Chromedriver](https://chromedriver.chromium.org) to control the browser.

## Prerequisites

- Google Chrome (tested with version 89)
- Node.js (tested with version 15.8.0).

## How to run tests

1. Clone this repository (`git clone https://github.com/Jmcosel/swaglabs-gui-tests.git`)
2. Navigate to the root of the folder and install the npm dependencies (`npm install`)
3. Run all tests with the following command: `npx wdio wdio.config.js`
