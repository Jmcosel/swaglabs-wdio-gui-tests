import GeneralPage from './general.page';

class InventoryPage extends GeneralPage {
  constructor() {
    super('Inventory', 'div.inventory_container');
  }

  get subheaderLabel() {
    return $('span.title');
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

  inventoryItemLink(itemName) {
    return $(`div=${itemName}`);
  }

  open() {
    super.open('inventory.html');
    this.waitForElements();
  }

  addToCartButton(itemId) {
    return $(`#add-to-cart-${itemId}`);
  }

  removeFromCartButton(itemId) {
    return $(`#remove-${itemId}`);
  }

  /**
   * Picks an item randomly, to keep test data dynamic.
   * @returns {Object} the chosen item's name, description, and price
   */
  pickItemRandomly() {
    let itemNames = this.inventoryItemNames.map((item) => item.getText());
    let itemDescriptions = this.inventoryItemDescriptions.map((item) => item.getText());
    let itemPrices = this.inventoryItemPrices.map((item) => item.getText());
    let choice = chance.integer({ min: 0, max: itemNames.length - 1 });
    let randomItem = {
      name: itemNames[choice],
      description: itemDescriptions[choice],
      price: itemPrices[choice]
    };
    return randomItem;
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

  waitForElements(visibility = true) {
    let elements = [this.subheaderLabel, this.sortDropdown, this.robotImage];
    browser.waitForElements(elements, visibility);
    browser.waitUntil(() => this.inventoryItems.length > 0);
  }
}

export default new InventoryPage();
