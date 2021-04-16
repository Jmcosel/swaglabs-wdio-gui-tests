export {};

declare global {
  namespace WebdriverIO {
      // interface Browser {
      //     browserCustomCommand: (arg: any) => void
      // }

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