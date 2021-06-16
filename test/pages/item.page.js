import GeneralPage from './general.page';

class ItemPage extends GeneralPage {
  constructor() {
    super('Inventory Item Detail', 'div.inventory_item_container');
  }

  get backButton() {
    return $('#back-to-products');
  }

  get itemName() {
    return $('div.inventory_details_name');
  }

  get itemDescription() {
    return $('div.inventory_details_desc');
  }

  get itemPrice() {
    return $('div.inventory_details_price');
  }

  get itemImage() {
    return $('img.inventory_details_img');
  }

  addToCartButton(itemId) {
    return $(`#add-to-cart-${itemId}`);
  }

  removeFromCartButton(itemId) {
    return $(`#remove-${itemId}`);
  }

  /**
   * Adds the specified item name to the shopping cart.
   * @param {String} itemId
   */
  clickAddToCart(itemId) {
    this.addToCartButton(itemId).waitForAndClick();
  }

  /**
   * Removes the specified item name from the shopping cart.
   * @param {String} itemId
   */
  clickRemoveFromCart(itemId) {
    this.removeFromCartButton(itemId).waitForAndClick();
  }

  open(itemId) {
    super.open(`inventory-item.html?id=${itemId}`);
    this.waitForElements();
  }

  waitForElements(visibility) {
    let elements = [this.itemName, this.itemDescription, this.itemPrice, this.itemImage];
    browser.waitForElements(elements, visibility);
  }
}

export default new ItemPage();
