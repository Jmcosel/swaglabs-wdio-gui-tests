import GeneralPage from './general.page';

class InventoryPage extends GeneralPage {
  constructor() {
    super('Inventory', 'div.inventory_container');
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
    super.open('inventory');
  }
}

export default new InventoryPage();
