import InventoryPage from '../pages/inventory.page';
import ItemPage from '../pages/item.page';
import HeaderModal from '../pages/header.modal';
import LoginPage from '../pages/login.page';
import Users from '../util/users';
import { nameToId, compareSortedArrays } from '../util/misc';

before(() => {
  LoginPage.open();
  LoginPage.login(Users.standard);
});

beforeEach(() => {
  InventoryPage.open();
  HeaderModal.waitForPageShown();
});

describe('Products Page', () => {
  it('Each product entry is fully loaded', () => {
    expect(InventoryPage.inventoryItems).toBeElementsArrayOfSize({ gte: 1 });
    // Check that all images are valid
    InventoryPage.inventoryItemImages.forEach((element) => {
      expect(element).toHaveAttributeContaining('src', '/static/media/');
      let imageUrl = element.getAttribute('src');
      let imageName = imageUrl.substring(imageUrl.indexOf('/media/') + 7);
      browser.newWindow(imageUrl);
      expect(browser).toHaveTitleContaining(imageName);
      browser.closeWindow();
      browser.switchToWindow(browser.getWindowHandles()[0]);
    });
    // Check that all descriptions are filled with text
    InventoryPage.inventoryItemDescriptions.forEach((element) => {
      expect(element.getText()).not.toEqual('');
    });
  });

  it('The item information on the inventory list matches its linked details page', () => {
    // Pick an item at random
    let itemCount = InventoryPage.inventoryItems.length;
    let itemId = chance.integer({ min: 0, max: itemCount - 1 });
    // Record the "expected" values for the chosen item
    let expectedItemName = InventoryPage.inventoryItemNames[itemId].getText();
    let expectedItemDescription = InventoryPage.inventoryItemDescriptions[itemId].getText();
    let expectedItemPrice = InventoryPage.inventoryItemPrices[itemId].getText();
    let expectedItemImage = InventoryPage.inventoryItemImages[itemId].getAttribute('src');
    // Compare the values to those on the details page
    InventoryPage.inventoryItemLink(expectedItemName).click();
    ItemPage.waitForPageShown();
    ItemPage.waitForElements();
    expect(ItemPage.itemName).toHaveText(expectedItemName);
    expect(ItemPage.itemDescription).toHaveText(expectedItemDescription);
    expect(ItemPage.itemPrice).toHaveText(expectedItemPrice);
    expect(ItemPage.itemImage).toHaveAttributeContaining('src', expectedItemImage);
  });

  it('Adding and removing an item to/from the cart is registered/remembered successfully', () => {
    // Pick an item at random
    let itemName = InventoryPage.pickItemRandomly().name;
    let initialShoppingCartSize = HeaderModal.shoppingCartBadge.isDisplayed()
      ? HeaderModal.shoppingCartBadge.getText()
      : '0';
    let itemElementId = nameToId(itemName);
    InventoryPage.clickAddToCart(itemElementId);
    let actualShoppingCartSize = HeaderModal.shoppingCartBadge.getText();
    expect(parseInt(actualShoppingCartSize)).toEqual(parseInt(initialShoppingCartSize) + 1);
    // The text for the item detail's "cart" button should be to "remove", rather than "add"
    InventoryPage.inventoryItemLink(itemName).click();
    expect(ItemPage.removeFromCartButton(itemElementId)).toBeDisplayed();
    // Return back to inventory page and actully remove it
    ItemPage.backButton.click();
    InventoryPage.waitForPageShown();
    InventoryPage.waitForElements();
    InventoryPage.clickRemoveFromCart(itemElementId);
    actualShoppingCartSize = HeaderModal.shoppingCartBadge.isDisplayed()
      ? HeaderModal.shoppingCartBadge.getText()
      : '0';
    expect(actualShoppingCartSize).toEqual(initialShoppingCartSize);
    // The text for the item detail's "cart" button should be to "add" once more, rather than "remove"
    InventoryPage.inventoryItemLink(itemName).click();
    expect(ItemPage.addToCartButton(itemElementId)).toBeDisplayed();
  });

  it('The sort dropdown rearranges the product list as expected', function () {
    // First check the default, item names (A-Z)
    compareSortedArrays(InventoryPage.inventoryItemNames, (a, b) => (b > a ? -1 : 1));
    // Check item names (Z-A)
    InventoryPage.sortDropdown.selectByAttribute('value', 'za');
    compareSortedArrays(InventoryPage.inventoryItemNames, (a, b) => (a > b ? -1 : 1));
    // Check item prices (low -> high)
    InventoryPage.sortDropdown.selectByAttribute('value', 'lohi');
    compareSortedArrays(InventoryPage.inventoryItemPrices, (a, b) => a - b);
    // Check item prices (high -> low)
    InventoryPage.sortDropdown.selectByAttribute('value', 'hilo');
    compareSortedArrays(InventoryPage.inventoryItemPrices, (a, b) => b - a);
  });
});
