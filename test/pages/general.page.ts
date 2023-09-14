class GeneralPage {
  name: string;
  selector: string;

  constructor(name: string, selector: string) {
    this.name = name;
    this.selector = selector;
  }

  get mainElement() {
    return $(this.selector);
  }

  /**
   * Open the class's page
   * @param path - Appends the provided text onto the baseUrl, defaults to ''
   */
  async open(path = '') {
    await browser.url(path);
    await this.waitForPageShown();
  }

  /**
   * Wait for the class to be (in)visible
   * @param visibility - Controls whether you wish for the page to be visible or not.
   */
  async waitForPageShown(visibility = true) {
    return $(this.selector).waitForDisplayed({
      reverse: !visibility,
      timeoutMsg: `ERROR: The ${this.name} page did not load.`
    });
  }
}

export default GeneralPage;
