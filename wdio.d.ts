import 'webdriverio';

declare global {
  namespace WebdriverIO {
    interface Browser {
      /**
       * Takes a list of WDIO elements and ensures that they all are (in)visible on the page.
       * Will wait until they each become (in)visible, or will fail.
       * @param elements - A list of WDIO elements
       * @param visibility - Controls whether you wish for each element to be visible or not.
       */
      waitForElements: (
        elements: WebdriverIO.Element[] | ChainablePromiseElement<WebdriverIO.Element>[],
        visibility?: boolean
      ) => Promise<void>;
    }
    interface Element {
      /**
       * Waits for and then clicks the element.
       * @param strict - If true, use the stricter "waitForClickable" method, rather than "waitForDisplayed". Defaults to true.
       * @param timeout - Value in ms, to override the default. Defaults to the waitforTimeout value set in WDIO's config.
       */
      waitForAndClick: (strict?: boolean, timeout?: number) => Promise<void>;
    }
  }
}

declare module 'webdriverio' {
  interface ChainablePromiseElement {
    /**
     * Waits for and then clicks the element.
     * @param timeout - Value in ms, to override the default. Defaults to the waitforTimeout value set in WDIO's config.
     * @param strict - If true, use the stricter "waitForClickable" method, rather than "waitForDisplayed". Defaults to true.
     */
    waitForAndClick: (timeout?: number, strict?: boolean) => Promise<void>;
  }
}

export {};
