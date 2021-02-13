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

  get menuList() {
    return $('div.bm-menu');
  }

  get logoutLink() {
    return $('a#logout_sidebar_link');
  }

  logout() {
    this.waitForAndClick(this.menuIcon);
    this.waitForAndClick(this.logoutLink);
  }

  waitForElements(visibility) {
    let elements = [this.menuIcon, this.mainLogo, this.shoppingCartIcon];
    super.waitForElements(elements, visibility);
  }
}

export default new HeaderModal();
