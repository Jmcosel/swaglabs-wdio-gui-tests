import GeneralPage from './general.page';

class InventoryPage extends GeneralPage {
  constructor() {
    super('Inventory', 'div.inventory_container');
  }

  get subheaderLabel() {
    return $('div.product_label');
  }

  get sortDropdown() {
    return $('select.product_sort_container');
  }

  get inventoryItems() {
    return $$('div.inventory_item');
  }

  get inventoryItemImages() {
    return $$('div.inventory_item_img > a > img');
  }

  get inventoryItemNames() {
    return $$('div.inventory_item_name');
  }

  get inventoryItemDescriptions() {
    return $$('div.inventory_item_desc');
  }

  get inventoryItemPrices() {
    return $$('div.inventory_item_price');
  }

  get robotImage() {
    return $('img.footer_robot');
  }

  addToCartButton(itemId) {
    return $(`#add-to-cart-${itemId}`);
  }

  removeFromCartButton(itemId) {
    return $(`#remove-${itemId}`);
  }

  open() {
    super.open('inventory.html');
  }

  /**
   * Adds the specified item name to the shopping cart.
   * @param {String} itemName
   */
  clickAddToCart(itemName) {
    let itemId = itemName.replace(/\s/g, '-').toLowerCase();
    this.addToCartButton(itemId).waitForAndClick();
  }

  /**
   * Removes the specified item name from the shopping cart.
   * @param {String} itemName
   */
  clickRemoveFromCart(itemName) {
    let itemId = itemName.replace(/\s/g, '-').toLowerCase();
    this.removeFromCartButton(itemId).waitForAndClick();
  }
}

export default new InventoryPage();
