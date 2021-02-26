import InventoryPage from '../pages/inventory.page';
import LoginPage from '../pages/login.page';
import Users from '../util/users';

beforeEach(() => {
  LoginPage.open();
});

describe('Login Test Suite', () => {
  it('A standard user can log in successfully', () => {
    let user = Users.standard;

    LoginPage.login(user.username, user.password);
    expect(InventoryPage.mainElement).toBeDisplayed();
  });

  it('A locked out user cannot access the inventory page', () => {
    let user = Users.locked_out;

    LoginPage.login(user.username, user.password);
    expect(LoginPage.mainElement).toBeDisplayed();
    LoginPage.errorMsg.waitForDisplayed({
      timeoutMsg: `The login error message never displayed.`
    });
    expect(LoginPage.errorMsg).toHaveTextContaining('locked out');
  });
});
