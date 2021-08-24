import GeneralPage from './general.page';

class CartPage extends GeneralPage {
  constructor() {
    super('Cart', 'div.cart_contents_container');
  }

  get inventoryItems() {
    return $$('div.inventory_item_name');
  }

  get checkoutButton() {
    return $('#checkout');
  }

  get cancelButton() {
    return $('#continue-shopping');
  }

  removeFromCartButton(itemId) {
    return $(`#remove-${itemId}`);
  }

  /**
   * Removes the specified item name from the shopping cart.
   * @param {String} itemName
   */
  clickRemoveFromCart(itemName) {
    let itemId = itemName.replace(/\s/g, '-').toLowerCase();
    this.removeFromCartButton(itemId).waitForAndClick();
  }

  open() {
    super.open('cart.html');
    this.waitForElements();
  }

  waitForElements(visibility = true) {
    let elements = [this.checkoutButton, this.cancelButton];
    browser.waitForElements(elements, visibility);
  }
}

export default new CartPage();
