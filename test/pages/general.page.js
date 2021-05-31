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
}
