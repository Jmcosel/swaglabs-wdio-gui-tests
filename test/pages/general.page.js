export default class GeneralPage {
  constructor(name, selector) {
    this.name = name;
    this.selector = selector;
  }

  get mainElement() {
    return $(this.selector);
  }

  /**
   * Open the class's page
   * @param {String} path - Appends the provided text onto the baseUrl, defaults to ''
   */
  open(path = '') {
    browser.url(path);
    this.waitForPageShown();
  }

  /**
   * Wait for the class to be (in)visible
   * @param {Boolean} visibility - Controls whether you wish for the page to be visible or not.
   */
  waitForPageShown(visibility = true) {
    return $(this.selector).waitForDisplayed({
      reverse: !visibility,
      timeoutMsg: `ERROR: The ${this.name} page did not load.`
    });
  }

  /**
   * Takes a list of WDIO elements and ensures that they all are (in)visible on the page.
   * Will wait until they each become (in)visible, or will fail.
   * @param {Array<WebdriverIO.Element>} elements - A list of WDIO elements
   * @param {Boolean} visibility - Controls whether you wish for each element to be visible or not.
   */
  waitForElements(elements, visibility = true) {
    elements.forEach((element) =>
      element.waitForDisplayed({
        reverse: !visibility,
        timeoutMsg: `ERROR: Element ${element.selector} never became visible on the ${this.name} page.`
      })
    );
  }
}
