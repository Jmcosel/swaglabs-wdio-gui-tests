export default class Page {
  constructor(selector) {
    this.selector = selector;
    // This is a special hack to handle clicking elements when Selenium cannot do it.
    this.clickInBrowser = function (element) {
      element.click();
    };
  }

  /**
   * Open the class's page
   */
  open(path) {
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
   * Wait for the class to be visible
   *
   * @param {boolean} isShown
   * @return {boolean}
   */
  waitForPageShown(isShown = true) {
    return $(this.selector).waitForDisplayed({ reverse: !isShown });
  }
}
