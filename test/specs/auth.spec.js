import InventoryPage from '../pages/inventory.page';
import LoginPage from '../pages/login.page';
import Users from '../util/users';

beforeEach(() => {
  browser.deleteCookies();
  LoginPage.open();
});

describe('Login/Authentication', () => {
  it('A standard user can log in successfully', () => {
    let user = Users.standard;

    LoginPage.login(user.username, user.password);
    expect(InventoryPage.mainElement).toBeDisplayed();
  });

  it('A locked out user cannot access the Products page', () => {
    let user = Users.locked_out;

    LoginPage.login(user.username, user.password);
    expect(LoginPage.mainElement).toBeDisplayed();
    LoginPage.errorMsg.waitForDisplayed({
      timeoutMsg: `The login error message never displayed.`
    });
    expect(LoginPage.errorMsg).toHaveTextContaining('locked out');
  });

  it('Trying to access a page directly without authentication fails', () => {
    browser.url('inventory.html');
    expect(InventoryPage.mainElement).not.toBeDisplayed();
    LoginPage.errorMsg.waitForDisplayed({
      timeoutMsg: `The login error message never displayed.`
    });
    expect(LoginPage.errorMsg).toHaveTextContaining('can only access');
  });
});
