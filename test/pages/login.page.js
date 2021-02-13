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
    return $('img.bot_column');
  }

  get errorMsg() {
    return $('h3[data-test="error"]');
  }

  open() {
    super.open();
    this.waitForElements();
  }

  waitForElements(visibility = true) {
    let elements = [
      this.header,
      this.usernameField,
      this.passwordField,
      this.submitButton,
      this.robotImage
    ];
    super.waitForElements(elements, visibility);
  }

  login(username, password) {
    this.usernameField.setValue(username);
    this.passwordField.setValue(password);
    this.submitButton.click();
  }
}

export default new LoginPage();
