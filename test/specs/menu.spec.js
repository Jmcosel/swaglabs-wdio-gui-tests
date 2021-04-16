import InventoryPage from '../pages/inventory.page';
import CartPage from '../pages/cart.page';
import HeaderModal from '../pages/header.modal';
import LoginPage from '../pages/login.page';
import Users from '../util/users';

let user = Users.standard;

before(() => {
  LoginPage.open();
  LoginPage.login(user.username, user.password);
});

beforeEach(() => {
  InventoryPage.open();
  HeaderModal.waitForPageShown();
});

describe('Hamburger Menu', () => {
  it('Shopping cart icon redirects to the Cart page', () => {
    HeaderModal.shoppingCartIcon.waitForAndClick();
    expect(browser).toHaveUrlContaining('cart');
  });

  it('"All Items" correctly redirects back to the Products page', () => {
    // Navigate to a different page
    HeaderModal.shoppingCartIcon.waitForAndClick();
    CartPage.waitForPageShown();
    HeaderModal.clickAllItems();
    expect(browser).toHaveUrlContaining('inventory');
  });

  it('"About" correctly redirects to Sauce Labs homepage', () => {
    HeaderModal.clickAbout();
    expect(browser).toHaveUrlContaining('saucelabs.com');
  });

  it('"Logout" deletes session cookie and redirects to Login page', () => {
    HeaderModal.clickLogout();
    expect(LoginPage.mainElement).toBeDisplayed();
    let authCookie = browser.getCookies(['session-username']);
    expect(authCookie).toHaveLength(0);
  });
});
