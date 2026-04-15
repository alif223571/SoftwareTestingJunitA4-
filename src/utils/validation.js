/**
 * Validation utilities for user input
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid email
 */
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid password
 */
const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return false;
  }
  
  return password.length >= 6;
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {boolean} - True if valid username
 */
const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return false;
  }
  
  return username.trim().length >= 3;
};

/**
 * Validate all user inputs
 * @param {Object} userData - User data object
 * @returns {Object} - Validation result with success flag and errors
 */
const validateUserData = (userData) => {
  const errors = [];
  
  if (!validateUsername(userData.username)) {
    errors.push('Username must be at least 3 characters long');
  }
  
  if (!validateEmail(userData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!validatePassword(userData.password)) {
    errors.push('Password must be at least 6 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUsername,
  validateUserData
};
