export default class GeneralPage {
  constructor(name, selector) {
    this.name = name;
    this.selector = selector;
    // Combines WDIO's "waitForClickable" and "click" commands for simple usage.
    this.waitForAndClick = (element) => {
      element.waitForClickable();
      element.click();
    };
  }

  /**
   * Open the class's page
   */
  open(path = '') {
    browser.url(path);
    this.waitForPageShown();
  }

  /**
   * Fully de-authenticate with the product
   */
  softFreshStart() {
    browser.deleteCookies();
  }

  /**
   * Destroys the current session and remakes it.
   */
  hardFreshStart() {
    browser.reloadSession();
  }

  /**
   * Wait for the class to be (in)visible
   * @param {boolean} visibility - Controls whether you wish for the page to be visible or not.
   * @returns {boolean} - Returns true if it finishes successfully.
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
   * @param {Array[]} elements - A list of WDIO elements
   * @param {boolean} visibility - Controls whether you wish for each element to be visible or not.
   * @returns {boolean} - Returns true if it finishes successfully.
   */
  waitForElements(elements, visibility = true) {
    return elements.forEach((element) =>
      element.waitForDisplayed({
        reverse: !visibility,
        timeoutMsg: `ERROR: Element ${element.selector} never became visible on the ${this.name} page.`
      })
    );
  }
}
