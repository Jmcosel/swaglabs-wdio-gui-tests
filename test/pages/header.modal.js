import GeneralPage from './general.page';

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

  openMenu() {
    this.waitForAndClick(this.menuIcon);
  }

  clickAllItems() {
    this.openMenu();
    this.waitForAndClick(this.allItemsLink);
  }

  clickAbout() {
    this.openMenu();
    this.waitForAndClick(this.aboutLink);
  }

  clickLogout() {
    this.openMenu();
    this.waitForAndClick(this.logoutLink);
  }

  clickResetAppState() {
    this.openMenu();
    this.waitForAndClick(this.resetAppLink);
  }

  waitForElements(visibility) {
    let elements = [this.menuIcon, this.mainLogo, this.shoppingCartIcon];
    super.waitForElements(elements, visibility);
  }
}

export default new HeaderModal();
