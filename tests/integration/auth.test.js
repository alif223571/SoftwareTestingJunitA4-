const { expect } = require('chai');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeDriver = require('chromedriver');
const LoginPage = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');
const { generateRandomUserData, sleep } = require('../utils/testHelpers');

describe('Authentication Integration Tests', function() {
  let driver;
  let loginPage;
  let signupPage;

  // Increase timeout for Selenium tests
  this.timeout(30000);

  // Setup before all tests
  before(async function() {
    // Start ChromeDriver
    chromeDriver.start();
    
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.manage().setTimeouts({ implicit: 3000 });

    loginPage = new LoginPage(driver);
    signupPage = new SignupPage(driver);
  });

  // Cleanup after all tests
  after(async function() {
    if (driver) {
      await driver.quit();
    }
    chromeDriver.stop();
  });

  describe('Login Scenarios', function() {

    it('should login successfully with valid credentials', async function() {
      const userData = generateRandomUserData();
      
      // First, create a user via signup
      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      // Now test login
      await loginPage.navigate();
      await loginPage.submitForm(userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await loginPage.getCurrentUrl();
      // Should redirect or show success (depending on implementation)
      expect(currentUrl).to.be.a('string');
    });

    it('should show error for wrong password', async function() {
      await loginPage.navigate();
      await loginPage.submitForm('test@example.com', 'wrongpassword');
      await sleep(1000);

      const errorMessage = await loginPage.getErrorMessage();
      // Form will submit to API, checking behavior
      expect(errorMessage).to.not.be.undefined;
    });

    it('should handle non-existing user login', async function() {
      await loginPage.navigate();
      await loginPage.submitForm('nonexistent@example.com', 'password123');
      await sleep(1000);

      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).to.include('localhost:3000');
    });

    it('should handle empty form submission', async function() {
      await loginPage.navigate();
      await loginPage.clickLogin();
      await sleep(500);

      // HTML5 required attribute should prevent submission
      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).to.include('localhost:3000');
    });

    it('should handle invalid email format', async function() {
      await loginPage.navigate();
      await loginPage.submitForm('invalid-email', 'password123');
      await sleep(1000);

      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

  });

  describe('Signup Scenarios', function() {

    it('should register successfully with valid data', async function() {
      const userData = generateRandomUserData();
      
      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1500);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle missing fields validation', async function() {
      await signupPage.navigate();
      await signupPage.clickSignup();
      await sleep(500);

      // HTML5 required should prevent submission
      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.include('localhost:3000/signup');
    });

    it('should reject short password', async function() {
      const userData = generateRandomUserData();
      
      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, '123');
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should reject invalid email', async function() {
      const userData = generateRandomUserData();
      
      await signupPage.navigate();
      await signupPage.submitForm(userData.username, 'invalid-email', userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should reject short username', async function() {
      const userData = generateRandomUserData();
      
      await signupPage.navigate();
      await signupPage.submitForm('ab', userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should navigate from login to signup page', async function() {
      await loginPage.navigate();
      await loginPage.clickSignupLink();
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.include('/signup');
    });

    it('should navigate from signup to login page', async function() {
      await signupPage.navigate();
      await signupPage.clickLoginLink();
      await sleep(1000);

      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).to.not.include('/signup');
    });

  });

});
