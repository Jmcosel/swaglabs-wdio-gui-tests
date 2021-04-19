import InventoryPage from '../pages/inventory.page';
import HeaderModal from '../pages/header.modal';
import CartPage from '../pages/cart.page';
import LoginPage from '../pages/login.page';
import Users from '../util/users';

before(function () {
  LoginPage.open();
  let user = Users.standard;
  LoginPage.login(user.username, user.password);
  InventoryPage.waitForPageShown();
});

afterEach(() => {
  HeaderModal.clickResetAppState();
  browser.refresh();
});

describe('Checkout', () => {
  it('Adding/removing items to/from the cart shows/removes the item from the summart page', () => {
    let itemName = 'Sauce Labs Bolt T-Shirt';
    InventoryPage.open();
    InventoryPage.clickAddToCart(itemName);
    HeaderModal.shoppingCartIcon.click();
    CartPage.waitForPageShown();
    let cartResult = CartPage.inventoryItems.find((element) => element.getText() === itemName);
    expect(cartResult).toExist();
    CartPage.clickRemoveFromCart(itemName);
    cartResult = CartPage.inventoryItems.find((element) => element.getText() === itemName);
    expect(cartResult).not.toExist();
  });
  it.skip('User can navigate through the checkout flow without issue', () => {});
  it.skip('Item total + tax is calculated correctly', () => {});
  it.skip('Field information is required to checkout', () => {});
  it.skip('The cart is reset when checkout is finished', () => {});
});
