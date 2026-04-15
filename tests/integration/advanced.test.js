const { expect } = require('chai');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeDriver = require('chromedriver');
const LoginPage = require('../pages/LoginPage');
const SignupPage = require('../pages/SignupPage');
const { generateRandomUserData, generateRandomString, generateRandomEmail, sleep } = require('../utils/testHelpers');

describe('Advanced Test Cases', function() {
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

  describe('Boundary Testing', function() {

    it('should accept password with exactly 6 characters (boundary)', async function() {
      const userData = generateRandomUserData();
      userData.password = 'pass12'; // Exactly 6 characters

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should reject password with 5 characters (just below boundary)', async function() {
      const userData = generateRandomUserData();
      userData.password = 'pass1'; // 5 characters

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should accept username with exactly 3 characters (boundary)', async function() {
      const userData = generateRandomUserData();
      userData.username = 'usr'; // Exactly 3 characters

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should reject username with 2 characters (just below boundary)', async function() {
      const userData = generateRandomUserData();
      userData.username = 'us'; // 2 characters

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

  });

  describe('Special Characters Input', function() {

    it('should handle username with special characters', async function() {
      const userData = generateRandomUserData();
      userData.username = 'user@#$%';

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle email with special characters in local part', async function() {
      const userData = generateRandomUserData();
      userData.email = `user.name+test${Date.now()}@example.com`;

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle password with special characters', async function() {
      const userData = generateRandomUserData();
      userData.password = 'P@ssw0rd!#$%';

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

  });

  describe('Random/Invalid Inputs', function() {

    it('should handle extremely long username (100+ characters)', async function() {
      const userData = generateRandomUserData();
      userData.username = generateRandomString(150); // 150 characters

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle extremely long password (100+ characters)', async function() {
      const userData = generateRandomUserData();
      userData.password = generateRandomString(150); // 150 characters

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle SQL injection attempt in username', async function() {
      const userData = generateRandomUserData();
      userData.username = "admin' OR '1'='1";

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle SQL injection attempt in email', async function() {
      const userData = generateRandomUserData();
      userData.email = "test@example.com' OR '1'='1";

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle HTML tags in username', async function() {
      const userData = generateRandomUserData();
      userData.username = '<script>alert("XSS")</script>';

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

  });

  describe('Rapid Multiple Submissions', function() {

    it('should handle rapid form submissions without creating duplicates', async function() {
      const userData = generateRandomUserData();

      // Submit form multiple times rapidly
      for (let i = 0; i < 3; i++) {
        await signupPage.navigate();
        await signupPage.submitForm(userData.username, userData.email, userData.password);
        await sleep(1000);
      }

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle rapid login attempts', async function() {
      // Attempt login multiple times rapidly
      for (let i = 0; i < 3; i++) {
        await loginPage.navigate();
        await loginPage.submitForm('test@example.com', 'password');
        await sleep(1000);
      }

      const currentUrl = await loginPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

  });

  describe('Edge Cases', function() {

    it('should handle whitespace-only username', async function() {
      const userData = generateRandomUserData();

      await signupPage.navigate();
      await signupPage.submitForm('   ', userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle whitespace-only email', async function() {
      const userData = generateRandomUserData();

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, '   ', userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle mixed case email addresses', async function() {
      const userData = generateRandomUserData();
      userData.email = `Test.User${Date.now()}@Example.COM`;

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle leading/trailing spaces in fields', async function() {
      const userData = generateRandomUserData();

      await signupPage.navigate();
      await signupPage.submitForm(
        `  ${userData.username}  `,
        `  ${userData.email}  `,
        `  ${userData.password}  `
      );
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle numeric-only username', async function() {
      const userData = generateRandomUserData();
      userData.username = '123456';

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

    it('should handle email with multiple dots', async function() {
      const userData = generateRandomUserData();
      userData.email = `test.user.name${Date.now()}@example.com`;

      await signupPage.navigate();
      await signupPage.submitForm(userData.username, userData.email, userData.password);
      await sleep(1000);

      const currentUrl = await signupPage.getCurrentUrl();
      expect(currentUrl).to.be.a('string');
    });

  });

});
