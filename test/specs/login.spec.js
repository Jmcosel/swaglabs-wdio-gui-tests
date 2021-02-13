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
    expect(InventoryPage.waitForPageShown()).to.be.true;
  });

  it('A locked out user cannot access the inventory page', () => {
    let user = Users.locked_out;

    LoginPage.login(user.username, user.password);
    expect(LoginPage.waitForPageShown()).to.be.true;
    LoginPage.errorMsg.waitForDisplayed({
      timeoutMsg: `The login error message never displayed.`
    });
    expect(LoginPage.errorMsg.getText()).to.have.string('locked out');
  });
});
