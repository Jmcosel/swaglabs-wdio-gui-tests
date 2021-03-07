import InventoryPage from '../pages/inventory.page';
import CartPage from '../pages/cart.page';
import LoginPage from '../pages/login.page';
import Users from '../util/users';

let user = Users.standard;

before(() => {
  LoginPage.open();
  LoginPage.login(user.username, user.password);
  InventoryPage.waitForPageShown();
});

beforeEach(() => {
  CartPage.open();
});

describe('Checkout', () => {
  it.skip('The cart summary contains all expected items', () => {});
  it.skip('Removing items from the cart page works as expected', () => {});
  it.skip('User can navigate through the checkout flow without issue', () => {});
  it.skip('Item total + tax is calculated correctly', () => {});
  it.skip('Field information is required to checkout', () => {});
  it.skip('The cart is reset when checkout is finished', () => {});
});
