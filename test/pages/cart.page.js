import GeneralPage from './general.page';

class CartPage extends GeneralPage {
  constructor() {
    super('Cart', 'div.cart_contents_container');
  }

  get inventoryItems() {
    return $$('div.inventory_item_name');
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
  }
}

export default new CartPage();
