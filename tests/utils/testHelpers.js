const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

/**
 * Create and configure WebDriver instance
 * @returns {Promise<WebDriver>} WebDriver instance
 */
async function createDriver() {
  const options = new chrome.Options();
  
  // Run in headless mode for faster testing
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments('--window-size=1920,1080');
  
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
  
  // Set implicit wait
  await driver.manage().setTimeouts({ implicit: 3000 });
  
  return driver;
}

/**
 * Quit WebDriver instance
 * @param {WebDriver} driver - WebDriver instance
 */
async function quitDriver(driver) {
  if (driver) {
    await driver.quit();
  }
}

/**
 * Generate random test data
 * @returns {Object} Random user data
 */
function generateRandomUserData() {
  const timestamp = Date.now();
  return {
    username: `testuser${timestamp}`,
    email: `test${timestamp}@example.com`,
    password: `password${timestamp}`
  };
}

/**
 * Generate random string
 * @param {number} length - String length
 * @returns {string} Random string
 */
function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 * @returns {string} Random email
 */
function generateRandomEmail() {
  return `test${Date.now()}@example.com`;
}

/**
 * Sleep utility function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  createDriver,
  quitDriver,
  generateRandomUserData,
  generateRandomString,
  generateRandomEmail,
  sleep
};
