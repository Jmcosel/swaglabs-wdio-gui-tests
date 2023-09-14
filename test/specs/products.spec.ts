import InventoryPage from '../pages/inventory.page.js';
import ItemPage from '../pages/item.page.js';
import HeaderModal from '../pages/header.modal.js';
import LoginPage from '../pages/login.page.js';
import Users from '../util/users.js';
import { nameToId, compareSortedArrays } from '../util/misc.js';

describe('Products Page', () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(Users.standard);
  });

  beforeEach(async () => {
    await InventoryPage.open();
    await HeaderModal.waitForPageShown();
  });

  it('Each product entry is fully loaded', async () => {
    await expect(InventoryPage.inventoryItems).toBeElementsArrayOfSize({ gte: 1 });
    // Check that all images are valid
    for (const element of await InventoryPage.inventoryItemImages) {
      await expect(element).toHaveAttributeContaining('src', '/static/media/');
      const imageUrl = await element.getAttribute('src');
      const imageName = imageUrl.substring(imageUrl.indexOf('/media/') + 7);
      await browser.newWindow(imageUrl);
      await expect(browser).toHaveTitleContaining(imageName);
      await browser.closeWindow();
      await browser.switchToWindow((await browser.getWindowHandles())[0]);
    }
    // Check that all descriptions are filled with text
    for (const element of await InventoryPage.inventoryItemDescriptions) {
      await expect(element.getText()).not.toEqual('');
    }
  });

  it('The item information on the inventory list matches its linked details page', async () => {
    // Pick an item at random
    const itemCount = (await InventoryPage.inventoryItems).length;
    const itemId = chance.integer({ min: 0, max: itemCount - 1 });
    // Record the "expected" values for the chosen item
    const expectedItemName = await InventoryPage.inventoryItemNames[itemId].getText();
    const expectedItemDescription = await InventoryPage.inventoryItemDescriptions[itemId].getText();
    const expectedItemPrice = await InventoryPage.inventoryItemPrices[itemId].getText();
    const expectedItemImage = await InventoryPage.inventoryItemImages[itemId].getAttribute('src');
    // Compare the values to those on the details page
    await (await InventoryPage.inventoryItemLink(expectedItemName)).click();
    await ItemPage.waitForPageShown();
    await ItemPage.waitForElements();
    await expect(ItemPage.itemName).toHaveText(expectedItemName);
    await expect(ItemPage.itemDescription).toHaveText(expectedItemDescription);
    await expect(ItemPage.itemPrice).toHaveText(expectedItemPrice);
    await expect(ItemPage.itemImage).toHaveAttributeContaining('src', expectedItemImage);
  });

  it('Adding and removing an item to/from the cart is registered/remembered successfully', async () => {
    // Pick an item at random
    const itemName = (await InventoryPage.pickItemRandomly()).name;
    const initialShoppingCartSize = (await HeaderModal.shoppingCartBadge.isDisplayed())
      ? await HeaderModal.shoppingCartBadge.getText()
      : '0';
    const itemElementId = nameToId(itemName);
    await InventoryPage.clickAddToCart(itemElementId);
    let actualShoppingCartSize = await HeaderModal.shoppingCartBadge.getText();
    await expect(parseInt(actualShoppingCartSize)).toEqual(parseInt(initialShoppingCartSize) + 1);
    // The text for the item detail's "cart" button should be to "remove", rather than "add"
    await (await InventoryPage.inventoryItemLink(itemName)).click();
    await expect(ItemPage.removeFromCartButton(itemElementId)).toBeDisplayed();
    // Return back to inventory page and actully remove it
    await ItemPage.backButton.click();
    await InventoryPage.waitForPageShown();
    await InventoryPage.waitForElements();
    await InventoryPage.clickRemoveFromCart(itemElementId);
    actualShoppingCartSize = (await HeaderModal.shoppingCartBadge.isDisplayed())
      ? await HeaderModal.shoppingCartBadge.getText()
      : '0';
    await expect(actualShoppingCartSize).toEqual(initialShoppingCartSize);
    // The text for the item detail's "cart" button should be to "add" once more, rather than "remove"
    await (await InventoryPage.inventoryItemLink(itemName)).click();
    await expect(ItemPage.addToCartButton(itemElementId)).toBeDisplayed();
  });

  it('The sort dropdown rearranges the product list as expected', async () => {
    // First check the default, item names (A-Z)
    await compareSortedArrays(await InventoryPage.inventoryItemNames, (a, b) => (b > a ? -1 : 1));
    // Check item names (Z-A)
    await InventoryPage.sortDropdown.selectByAttribute('value', 'za');
    await compareSortedArrays(await InventoryPage.inventoryItemNames, (a, b) => (a > b ? -1 : 1));
    // Check item prices (low -> high)
    await InventoryPage.sortDropdown.selectByAttribute('value', 'lohi');
    await compareSortedArrays(await InventoryPage.inventoryItemPrices, (a, b) => a - b);
    // Check item prices (high -> low)
    await InventoryPage.sortDropdown.selectByAttribute('value', 'hilo');
    await compareSortedArrays(await InventoryPage.inventoryItemPrices, (a, b) => b - a);
  });
});
