import InventoryPage from '../pages/inventory.page.js';
import LoginPage from '../pages/login.page.js';
import Users from '../util/users.js';

describe('Login/Authentication', () => {
  beforeEach(async () => {
    await browser.deleteCookies();
    await LoginPage.open();
  });

  it('A standard user can log in successfully', async () => {
    await LoginPage.login(Users.standard);
    await expect(InventoryPage.mainElement).toBeDisplayed();
  });

  it('A locked out user cannot access the Products page', async () => {
    await LoginPage.login(Users.locked_out);
    await expect(LoginPage.mainElement).toBeDisplayed();
    await LoginPage.errorMsg.waitForDisplayed({
      timeoutMsg: `The login error message never displayed.`
    });
    await expect(LoginPage.errorMsg).toHaveTextContaining('locked out');
  });

  it('Trying to access a page directly without authentication fails', async () => {
    await browser.url('inventory.html');
    await expect(InventoryPage.mainElement).not.toBeDisplayed();
    await LoginPage.errorMsg.waitForDisplayed({
      timeoutMsg: `The login error message never displayed.`
    });
    await expect(LoginPage.errorMsg).toHaveTextContaining('can only access');
  });
});
