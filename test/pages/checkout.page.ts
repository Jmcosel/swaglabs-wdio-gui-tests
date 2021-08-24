import GeneralPage from './general.page';

class CheckoutPage extends GeneralPage {
  constructor() {
    super('Checkout', 'div.checkout_info_container');
  }

  get headerLabel() {
    return $('span.title');
  }

  get firstNameField() {
    return $('#first-name');
  }

  get lastNameField() {
    return $('#last-name');
  }

  get zipCodeField() {
    return $('#postal-code');
  }

  get fieldErrorContainer() {
    return $('div.error-message-container');
  }

  get subtotalLabel() {
    return $('div.summary_subtotal_label');
  }

  get taxLabel() {
    return $('div.summary_tax_label');
  }

  get totalLabel() {
    return $('div.summary_total_label');
  }

  get continueButton() {
    return $('#continue');
  }

  get cancelButton() {
    return $('#cancel');
  }

  get finishButton() {
    return $('#finish');
  }

  get returnToInventoryButton() {
    return $('#back-to-products');
  }

  get completeContainer() {
    return $('div.checkout_complete_container');
  }

  get completePonyImage() {
    return $('img.pony_express');
  }

  /**
   * Fills out the fields and then submits to the next checkout step
   * @param {Object} customerInfo
   */
  fillFields(customerInfo) {
    this.firstNameField.setValue(customerInfo.firstName);
    this.lastNameField.setValue(customerInfo.lastName);
    this.zipCodeField.setValue(customerInfo.zipCode);
  }

  waitForElements(visibility = true) {
    let elements = [
      this.headerLabel,
      this.firstNameField,
      this.lastNameField,
      this.zipCodeField,
      this.continueButton,
      this.cancelButton
    ];
    browser.waitForElements(elements, visibility);
  }
}

export default new CheckoutPage();
