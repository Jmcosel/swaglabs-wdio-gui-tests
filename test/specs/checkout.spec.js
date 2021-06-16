import InventoryPage from '../pages/inventory.page';
import HeaderModal from '../pages/header.modal';
import CartPage from '../pages/cart.page';
import LoginPage from '../pages/login.page';
import CheckoutPage from '../pages/checkout.page';
import Users from '../util/users';
import { nameToId } from '../util/misc';

before(function () {
  LoginPage.open();
  LoginPage.login(Users.standard);
  InventoryPage.waitForPageShown();
});

beforeEach(() => {
  InventoryPage.open();
});

afterEach(() => {
  HeaderModal.clickResetAppState();
});

describe('Checkout', () => {
  it('Adding/removing items to/from the cart shows/removes the item from the summary page', () => {
    let itemName = InventoryPage.pickItemRandomly().name;
    let itemElementId = nameToId(itemName);
    InventoryPage.clickAddToCart(itemElementId);
    HeaderModal.shoppingCartIcon.click();
    CartPage.waitForPageShown();
    CartPage.waitForElements();
    let cartResult = CartPage.inventoryItems.find((element) => element.getText() === itemName);
    expect(cartResult).toExist();
    CartPage.clickRemoveFromCart(itemElementId);
    cartResult = CartPage.inventoryItems.find((element) => element.getText() === itemName);
    expect(cartResult).not.toExist();
  });

  it('User can navigate through the happy path flow without issue', () => {
    /** The following assertions are tested in this flow:
     * - Item total (across two items), and the 8% tax, are calculated correctly
     * - The cart is reset when checkout is finished
     */
    let item1 = InventoryPage.pickItemRandomly();
    let item2;
    do {
      item2 = InventoryPage.pickItemRandomly();
    } while (item1.name === item2.name);
    InventoryPage.clickAddToCart(nameToId(item1.name));
    InventoryPage.clickAddToCart(nameToId(item2.name));
    HeaderModal.shoppingCartIcon.click();
    CartPage.waitForPageShown();
    CartPage.checkoutButton.waitForAndClick();
    CheckoutPage.waitForPageShown();
    CheckoutPage.waitForElements();
    CheckoutPage.fillFields(Users.standard);
    CheckoutPage.continueButton.click();
    let expectedSubtotal = parseFloat(item1.price.replace('$', '')) + parseFloat(item2.price.replace('$', ''));
    let expectedTax = expectedSubtotal * 0.08;
    let expectedTotal = expectedSubtotal + expectedTax;
    expect(CheckoutPage.subtotalLabel).toHaveTextContaining(expectedSubtotal.toFixed(2));
    expect(CheckoutPage.taxLabel).toHaveTextContaining(expectedTax.toFixed(2));
    expect(CheckoutPage.totalLabel).toHaveTextContaining(expectedTotal.toFixed(2));
    CheckoutPage.finishButton.click();
    CheckoutPage.completeContainer.waitForDisplayed();
    expect(CheckoutPage.completePonyImage).toBeDisplayed();
    CheckoutPage.returnToInventoryButton.waitForAndClick();
    InventoryPage.waitForPageShown();
    // If the bage isn't displayed, then no items are registered as added
    expect(HeaderModal.shoppingCartBadge).not.toBeDisplayed();
  });

  it('Field information is required to checkout', () => {
    let item = InventoryPage.pickItemRandomly();
    InventoryPage.clickAddToCart(nameToId(item.name));
    HeaderModal.shoppingCartIcon.click();
    CartPage.waitForPageShown();
    CartPage.checkoutButton.waitForAndClick();
    CheckoutPage.waitForPageShown();
    CheckoutPage.continueButton.waitForAndClick();
    // Verify the error container appesrs, and that a label from the next screen doesn't appear
    expect(CheckoutPage.fieldErrorContainer).toBeDisplayed();
    expect(CheckoutPage.subtotalLabel).not.toBeDisplayed();
  });
});
