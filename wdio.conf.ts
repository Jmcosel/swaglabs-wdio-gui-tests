import type { Options } from '@wdio/types';
import { browser } from '@wdio/globals';

import chance from 'chance';

const debug = process.env.DEBUG;

export const config: Options.Testrunner = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
  // on a remote machine).
  runner: 'local',
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: ['./test/specs/**/*.spec.ts'],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  //
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // First, you can define how many instances should be started at the same time. Let's
  // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
  // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
  // files and you set maxInstances to 10, all spec files will get tested at the same time
  // and 30 processes will get spawned. The property handles how many capabilities
  // from the same test should run tests.
  //
  maxInstances: debug ? 1 : 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [
    {
      // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      // grid with only 5 firefox instances available you can make sure that not more than
      // 5 instances get started at a time.
      maxInstances: debug ? 1 : 5,
      //
      browserName: 'chrome'
      // If outputDir is provided WebdriverIO can capture driver session logs
      // it is possible to configure which logTypes to include/exclude.
      // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
      // excludeDriverLogs: ['bugreport', 'server'],
    }
  ],
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: debug ? 'info' : 'error',
  //
  // Set specific log levels per logger
  // loggers:
  // - webdriver, webdriverio
  // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
  // - @wdio/mocha-framework, @wdio/jasmine-framework
  // - @wdio/local-runner
  // - @wdio/sumologic-reporter
  // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  // logLevels: {
  //     webdriver: 'info',
  //     '@wdio/applitools-service': 'info'
  // },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: 'https://www.saucedemo.com/',
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // Test runner services
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.
  services: [],

  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber
  // see also: https://webdriver.io/docs/frameworks
  //
  // Make sure you have the wdio adapter package for the specific framework installed
  // before running any tests.
  framework: 'mocha',
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: https://webdriver.io/docs/dot-reporter
  reporters: ['spec'],

  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd',
    timeout: debug ? 9999999 : 60000,
    bail: false
  },

  // TypeScript options - WDIO can auto-transpile
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: false,
      files: true
    }
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param config wdio configuration object
   * @param capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param cid      capability id (e.g 0-0)
   * @param caps     object containing capabilities for session that will be spawn in the worker
   * @param specs    specs to be run in the worker process
   * @param args     object that will be merged with the main configuration once worker is initialised
   * @param execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param config wdio configuration object
   * @param capabilities list of capabilities details
   * @param specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param _capabilities list of capabilities details
   * @param _specs        List of spec file paths that are to be run
   * @param browser       instance of created browser/device session
   */
  before: function (_capabilities, _specs, browser) {
    global.chance = chance.Chance();

    // Custom command creation

    /**
     * Waits for and then clicks the element.
     * @param strict - If true, use the stricter "waitForClickable" method, rather than "waitForDisplayed". Defaults to true.
     * @param timeout - Value in ms, to override the default. Defaults to the waitforTimeout value set in WDIO's config.
     */
    browser.addCommand(
      'waitForAndClick',
      async function (this: WebdriverIO.Element, strict = true, timeout: number = browser.options.waitforTimeout) {
        strict ? await this.waitForClickable({ timeout }) : await this.waitForDisplayed({ timeout });
        await this.click();
      },
      true
    );

    /**
     * Takes a list of WDIO elements and ensures that they all are (in)visible on the page.
     * Will wait until they each become (in)visible, or will fail.
     * @param elements - A list of WDIO elements
     * @param visibility - Controls whether you wish for each element to be visible or not.
     */
    browser.addCommand('waitForElements', async function (elements: Array<WebdriverIO.Element>, visibility = true) {
      for (const element of elements) {
        await element.waitForDisplayed({
          reverse: !visibility,
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          timeoutMsg: `ERROR: Element ${element.selector} never became visible.`
        });
      }
    });
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param _commandName hook command name
   * @param _args arguments that command would receive
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeCommand: async function (_commandName, _args) {
    // Slow down the execution if in debug mode
    if (debug) {
      // eslint-disable-next-line wdio/no-pause
      await browser.pause(50);
    }
  },
  /**
   * Hook that gets executed before the suite starts
   * @param suite suite details
   */
  // beforeSuite: function (suite) {
  // },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  // beforeTest: function (test, context) {
  // },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: function (test, context, { error, result, duration, passed, retries }) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine).
   * @param _test Test object
   * @param _context Context object
   * @param root0 Meta information about test run - { error, result, duration, passed, retries }
   */
  // eslint-disable-next-line no-unused-vars
  afterTest: async function (_test, _context, { error, passed }) {
    // Start REPL mode if in debug mode and the test fails
    if (debug && !passed) {
      console.log(error.stack);
      // eslint-disable-next-line wdio/no-debug
      await browser.debug();
    }
  }
  /**
   * Hook that gets executed after the suite has ended
   * @param suite suite details
   */
  // afterSuite: function (suite) {
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param commandName hook command name
   * @param args arguments that command would receive
   * @param result 0 - command success, 1 - command error
   * @param error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param result 0 - test pass, 1 - test fail
   * @param capabilities list of capabilities details
   * @param specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param config wdio configuration object
   * @param capabilities list of capabilities details
   * @param specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param exitCode 0 - success, 1 - fail
   * @param config wdio configuration object
   * @param capabilities list of capabilities details
   * @param results object containing test results
   */
  // onComplete: function(exitCode, config, capabilities, results) {
  // },
  /**
   * Gets executed when a refresh happens.
   * @param oldSessionId session ID of the old session
   * @param newSessionId session ID of the new session
   */
  //onReload: function(oldSessionId, newSessionId) {
  //}
};

export default config;
