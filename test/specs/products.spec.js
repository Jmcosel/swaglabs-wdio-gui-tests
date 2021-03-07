import InventoryPage from '../pages/inventory.page';
import LoginPage from '../pages/login.page';
import Users from '../util/users';

let user = Users.standard;

before(() => {
  LoginPage.open();
  LoginPage.login(user.username, user.password);
});

beforeEach(() => {
  InventoryPage.open();
});

describe('Products Page', () => {
  it.skip('The list of products is loaded', () => {});
  it.skip('Adding an item to the cart is registered successfully', () => {});
  it.skip('Remvoving an item from the cart is deregistered successfully', () => {});
  it.skip('Clicking on an item takes the user to its details page', () => {});
  it.skip('Cart additions/subtractions are remembered across pages', () => {});
  it.skip('The sort dropdown rearranges the product list as expected', () => {});
});
