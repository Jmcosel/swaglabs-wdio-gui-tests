import GeneralPage from './general.page';

class LoginPage extends GeneralPage {
  constructor() {
    super('Login', 'div.login_wrapper');
  }

  get headerLabel() {
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
    this.waitForElements();
  }

  waitForElements(visibility?: boolean) {
    let elements = [this.headerLabel, this.usernameField, this.passwordField, this.submitButton, this.robotImage];
    browser.waitForElements(elements, visibility);
  }

  /**
   * Handles the login functionality.
   * @param {Object} user
   */
  login(user) {
    this.usernameField.setValue(user.username);
    this.passwordField.setValue(user.password);
    this.submitButton.click();
  }
}

export default new LoginPage();
