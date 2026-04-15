const { By, until } = require('selenium-webdriver');

/**
 * Page Object Model for Signup Page
 */
class SignupPage {
  constructor(driver) {
    this.driver = driver;
    
    // Element locators
    this.locators = {
      usernameInput: By.id('username'),
      emailInput: By.id('email'),
      passwordInput: By.id('password'),
      signupButton: By.id('signupBtn'),
      loginLink: By.id('loginLink'),
      errorMessage: By.id('errorMessage'),
      successMessage: By.id('successMessage'),
      signupForm: By.id('signupForm')
    };
  }

  /**
   * Navigate to signup page
   */
  async navigate() {
    await this.driver.get('http://localhost:3000/signup');
    await this.driver.wait(until.elementLocated(this.locators.signupForm), 5000);
  }

  /**
   * Enter username in the username field
   * @param {string} username - Username
   */
  async enterUsername(username) {
    const usernameField = await this.driver.findElement(this.locators.usernameInput);
    await usernameField.clear();
    await usernameField.sendKeys(username);
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
   * Click the signup button
   */
  async clickSignup() {
    const signupBtn = await this.driver.findElement(this.locators.signupButton);
    await signupBtn.click();
  }

  /**
   * Submit the signup form with all fields
   * @param {string} username - Username
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  async submitForm(username, email, password) {
    await this.enterUsername(username);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignup();
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
   * Click the login link
   */
  async clickLoginLink() {
    const loginLink = await this.driver.findElement(this.locators.loginLink);
    await loginLink.click();
  }

  /**
   * Get current page URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await this.driver.getCurrentUrl();
  }
}

module.exports = SignupPage;
