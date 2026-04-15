const { By, until } = require('selenium-webdriver');

/**
 * Page Object Model for Login Page
 */
class LoginPage {
  constructor(driver) {
    this.driver = driver;
    
    // Element locators
    this.locators = {
      emailInput: By.id('email'),
      passwordInput: By.id('password'),
      loginButton: By.id('loginBtn'),
      signupLink: By.id('signupLink'),
      errorMessage: By.id('errorMessage'),
      successMessage: By.id('successMessage'),
      loginForm: By.id('loginForm')
    };
  }

  /**
   * Navigate to login page
   */
  async navigate() {
    await this.driver.get('http://localhost:3000/');
    await this.driver.wait(until.elementLocated(this.locators.loginForm), 5000);
  }

  /**
   * Enter email in the email field
   * @param {string} email - Email address
   */
  async enterEmail(email) {
    const emailField = await this.driver.findElement(this.locators.emailInput);
    await emailField.clear();
    await emailField.sendKeys(email);
  }

  /**
   * Enter password in the password field
   * @param {string} password - Password
   */
  async enterPassword(password) {
    const passwordField = await this.driver.findElement(this.locators.passwordInput);
    await passwordField.clear();
    await passwordField.sendKeys(password);
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    const loginBtn = await this.driver.findElement(this.locators.loginButton);
    await loginBtn.click();
  }

  /**
   * Submit the login form with email and password
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async submitForm(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Get error message text
   * @returns {Promise<string>} Error message
   */
  async getErrorMessage() {
    try {
      const errorElement = await this.driver.findElement(this.locators.errorMessage);
      return await errorElement.getText();
    } catch (error) {
      return null;
    }
  }

  /**
   * Get success message text
   * @returns {Promise<string>} Success message
   */
  async getSuccessMessage() {
    try {
      const successElement = await this.driver.findElement(this.locators.successMessage);
      return await successElement.getText();
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if error message is displayed
   * @returns {Promise<boolean>}
   */
  async isErrorMessageDisplayed() {
    try {
      const errorElement = await this.driver.findElement(this.locators.errorMessage);
      return await errorElement.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Click the signup link
   */
  async clickSignupLink() {
    const signupLink = await this.driver.findElement(this.locators.signupLink);
    await signupLink.click();
  }

  /**
   * Get current page URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await this.driver.getCurrentUrl();
  }
}

module.exports = LoginPage;
