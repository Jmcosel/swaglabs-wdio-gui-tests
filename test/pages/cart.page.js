import GeneralPage from './general.page';

class CartPage extends GeneralPage {
  constructor() {
    super('Cart', 'div.cart_contents_container');
  }

  open() {
    super.open('cart.html');
  }
}

export default new CartPage();
