import InventoryPage from '../pages/inventory.page';
import HeaderModal from '../pages/header.modal';
import LoginPage from '../pages/login.page';
import Users from '../util/users';

before(() => {
  LoginPage.open();
  let user = Users.standard;
  LoginPage.login(user.username, user.password);
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
  it('Adding and removing an item to/from the cart is registered successfully', () => {
    let itemName = 'Sauce Labs Backpack';
    let initialShoppingCartSize = HeaderModal.shoppingCartBadge.isDisplayed()
      ? HeaderModal.shoppingCartBadge.getText()
      : '0';
    InventoryPage.clickAddToCart(itemName);
    let actualShoppingCartSize = HeaderModal.shoppingCartBadge.getText();
    expect(parseInt(actualShoppingCartSize)).toEqual(parseInt(initialShoppingCartSize) + 1);
    InventoryPage.clickRemoveFromCart(itemName);
    actualShoppingCartSize = HeaderModal.shoppingCartBadge.isDisplayed()
      ? HeaderModal.shoppingCartBadge.getText()
      : '0';
    expect(actualShoppingCartSize).toEqual(initialShoppingCartSize);
  });
  it('The sort dropdown rearranges the product list as expected', function () {
    // First check the default, item names (A-Z)
    _compareSortedArrays(InventoryPage.inventoryItemNames, (a, b) => (b > a ? -1 : 1));
    // Check item names (Z-A)
    InventoryPage.sortDropdown.selectByAttribute('value', 'za');
    _compareSortedArrays(InventoryPage.inventoryItemNames, (a, b) => (a > b ? -1 : 1));
    // Check item prices (low -> high)
    InventoryPage.sortDropdown.selectByAttribute('value', 'lohi');
    _compareSortedArrays(InventoryPage.inventoryItemPrices, (a, b) => a - b);
    // Check item prices (high -> low)
    InventoryPage.sortDropdown.selectByAttribute('value', 'hilo');
    _compareSortedArrays(InventoryPage.inventoryItemPrices, (a, b) => b - a);
  });
  it.skip('Clicking on an item takes the user to its details page', () => {});
  it.skip('Cart additions/subtractions are remembered across pages', () => {});
});

/**
 * Checks that the order in which items are sorted on a page matches the expected order
 * when the appropriate sorting algorithm is applied.
 * @param {WebdriverIO.ElementArray} array
 * @param {(str1, str2) => number} sortFunction
 */
function _compareSortedArrays(array, sortFunction) {
  let actual = array.map((element) => element.getText());
  // Convert values to numbers for prices
  if (actual[0].includes('$')) {
    // @ts-ignore
    actual = actual.map((text) => parseFloat(text.replace('$', '')));
  }
  let expected = [...actual];
  // Using the sort function on this array should do nothing if already sorted properly
  expected.sort(sortFunction);
  expect(expected).toEqual(actual);
}
