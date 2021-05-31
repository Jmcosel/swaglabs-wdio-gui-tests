declare global {
  namespace WebdriverIO {
      interface Browser {
        /**
        * Takes a list of WDIO elements and ensures that they all are (in)visible on the page.
        * Will wait until they each become (in)visible, or will fail.
        * @param {Array<WebdriverIO.Element>} elements - A list of WDIO elements
        * @param {Boolean} visibility - Controls whether you wish for each element to be visible or not.
        */
        waitForElements: (elements: Array<WebdriverIO.Element>, visibility?: boolean) => void
      }
      interface Element {
         /**
          * Waits for and then clicks the element.
          * @param {Number} timeout - Value in ms, to override the default. Defaults to the waitforTimeout value set in WDIO's config.
          * @param {Boolean} strict - If true, use the stricter "waitForClickable" method, rather than "waitForDisplayed". Defaults to true.
          */
          waitForAndClick: (timeout?: number, strict?: boolean) => void
      }
  }
}

export {};