import GeneralPage from './general.page.js';

class CheckoutPage extends GeneralPage {
  constructor() {
    super('Checkout', 'div.checkout_info_container');
  }

  get headerLabel() {
    return $('span.title');
  }

  get firstNameField() {
    return $('input[data-test="firstName"]');
  }

  get lastNameField() {
    return $('input[data-test="lastName"]');
  }

  get zipCodeField() {
    return $('input[data-test="postalCode"]');
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
    return $('input[data-test="continue"]');
  }

  get cancelButton() {
    return $('button[data-test="cancel"]');
  }

  get finishButton() {
    return $('button[data-test="finish"]');
  }

  get returnToInventoryButton() {
    return $('button[data-test="back-to-products"]');
  }

  get completeContainer() {
    return $('div.checkout_complete_container');
  }

  get completePonyImage() {
    return $('img.pony_express');
  }

  /**
   * Fills out the fields and then submits to the next checkout step
   * @param customerInfo - An object that includes the full name and zip code of the customer's information.
   */
  async fillFields(customerInfo: { firstName: string; lastName: string; zipCode: string }): Promise<void> {
    await this.firstNameField.setValue(customerInfo.firstName);
    await this.lastNameField.setValue(customerInfo.lastName);
    await this.zipCodeField.setValue(customerInfo.zipCode);
  }

  async waitForElements(visibility = true) {
    const elements = [
      this.headerLabel,
      this.firstNameField,
      this.lastNameField,
      this.zipCodeField,
      this.continueButton,
      this.cancelButton
    ];
    await browser.waitForElements(elements, visibility);
  }
}

export default new CheckoutPage();
