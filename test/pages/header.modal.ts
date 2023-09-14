import GeneralPage from './general.page.js';

class HeaderModal extends GeneralPage {
  constructor() {
    super('Header', 'div.header_container');
  }

  get menuIcon() {
    return $('div.bm-burger-button');
  }

  get mainLogo() {
    return $('div.app_logo');
  }

  get shoppingCartIcon() {
    return $('div.shopping_cart_container');
  }

  get shoppingCartBadge() {
    return $('span.shopping_cart_badge');
  }

  get menuList() {
    return $('div.bm-menu');
  }

  get allItemsLink() {
    return $('a#inventory_sidebar_link');
  }

  get aboutLink() {
    return $('a#about_sidebar_link');
  }

  get logoutLink() {
    return $('a#logout_sidebar_link');
  }

  get resetAppLink() {
    return $('a#reset_sidebar_link');
  }

  async clickAllItems() {
    await this.menuIcon.waitForAndClick();
    await this.allItemsLink.waitForAndClick();
  }

  async clickAbout() {
    await this.menuIcon.waitForAndClick();
    await this.aboutLink.waitForAndClick();
  }

  async clickLogout() {
    await this.menuIcon.waitForAndClick();
    await this.logoutLink.waitForAndClick();
  }

  async clickResetAppState() {
    await this.menuIcon.waitForAndClick();
    await this.resetAppLink.waitForAndClick();
  }

  async waitForElements(visibility = true) {
    const elements = [this.menuIcon, this.mainLogo, this.shoppingCartIcon];
    await browser.waitForElements(elements, visibility);
  }
}

export default new HeaderModal();
