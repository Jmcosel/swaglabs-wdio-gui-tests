import GeneralPage from './general.page';

class LoginPage extends GeneralPage {
  constructor() {
    super('Login', 'div.login_wrapper');
  }

  get header() {
    return $('div.login_logo');
  }

  get usernameField() {
    return $('input[data-test="username"]');
  }

  get passwordField() {
    return $('input[data-test="password"]');
  }

  get submitButton() {
    return $('input#login-button');
  }

  get robotImage() {
    return $('div.bot_column');
  }

  get errorMsg() {
    return $('h3[data-test="error"]');
  }

  open() {
    super.open();
    let elements = [this.header, this.usernameField, this.passwordField, this.submitButton, this.robotImage];
    browser.waitForElements(elements);
  }

  /**
   * Handles the login functionality.
   * @param {string} username
   * @param {string} password
   */
  login(username, password) {
    this.usernameField.setValue(username);
    this.passwordField.setValue(password);
    this.submitButton.click();
  }
}

export default new LoginPage();
