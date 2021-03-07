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

  get robotImage() {
    return $('img.footer_robot');
  }

  open() {
    super.open('inventory.html');
  }
}

export default new InventoryPage();
