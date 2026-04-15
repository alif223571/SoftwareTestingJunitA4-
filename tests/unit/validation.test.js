const { expect } = require('chai');
const { 
  validateEmail, 
  validatePassword, 
  validateUsername,
  validateUserData
} = require('../../src/utils/validation');

describe('Validation Unit Tests', function() {
  
  describe('Email Validation', function() {
    
    it('should return true for valid email', function() {
      const result = validateEmail('user@example.com');
      expect(result).to.be.true;
    });

    it('should return false for email missing @ symbol', function() {
      const result = validateEmail('userexample.com');
      expect(result).to.be.false;
    });

    it('should return false for email missing domain', function() {
      const result = validateEmail('user@');
      expect(result).to.be.false;
    });

    it('should return false for empty email', function() {
      const result = validateEmail('');
      expect(result).to.be.false;
    });

    it('should return false for null email', function() {
      const result = validateEmail(null);
      expect(result).to.be.false;
    });

    it('should return true for email with subdomain', function() {
      const result = validateEmail('user@mail.example.com');
      expect(result).to.be.true;
    });

    it('should return true for email with dots and hyphens', function() {
      const result = validateEmail('user.name@test-domain.com');
      expect(result).to.be.true;
    });

  });

  describe('Password Validation', function() {
    
    it('should return true for valid password (6 characters)', function() {
      const result = validatePassword('pass123');
      expect(result).to.be.true;
    });

    it('should return true for password longer than 6 characters', function() {
      const result = validatePassword('password123');
      expect(result).to.be.true;
    });

    it('should return false for short password (less than 6 characters)', function() {
      const result = validatePassword('pass');
      expect(result).to.be.false;
    });

    it('should return false for empty password', function() {
      const result = validatePassword('');
      expect(result).to.be.false;
    });

    it('should return false for null password', function() {
      const result = validatePassword(null);
      expect(result).to.be.false;
    });

    it('should return true for password with exactly 6 characters', function() {
      const result = validatePassword('123456');
      expect(result).to.be.true;
    });

    it('should return false for password with 5 characters', function() {
      const result = validatePassword('12345');
      expect(result).to.be.false;
    });

  });

  describe('Username Validation', function() {
    
    it('should return true for valid username (3 characters)', function() {
      const result = validateUsername('abc');
      expect(result).to.be.true;
    });

    it('should return true for username longer than 3 characters', function() {
      const result = validateUsername('testuser');
      expect(result).to.be.true;
    });

    it('should return false for short username (less than 3 characters)', function() {
      const result = validateUsername('ab');
      expect(result).to.be.false;
    });

    it('should return false for empty username', function() {
      const result = validateUsername('');
      expect(result).to.be.false;
    });

    it('should return false for null username', function() {
      const result = validateUsername(null);
      expect(result).to.be.false;
    });

    it('should return true for username with exactly 3 characters', function() {
      const result = validateUsername('usr');
      expect(result).to.be.true;
    });

    it('should return false for username with 2 characters', function() {
      const result = validateUsername('us');
      expect(result).to.be.false;
    });

    it('should return true for username with spaces (trimmed)', function() {
      const result = validateUsername('  testuser  ');
      expect(result).to.be.true;
    });

  });

  describe('Complete User Data Validation', function() {
    
    it('should return valid for correct user data', function() {
      const result = validateUserData({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
      expect(result.isValid).to.be.true;
      expect(result.errors).to.be.an('array').that.is.empty;
    });

    it('should return invalid for missing username', function() {
      const result = validateUserData({
        username: '',
        email: 'test@example.com',
        password: 'password123'
      });
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include('Username must be at least 3 characters long');
    });

    it('should return invalid for invalid email', function() {
      const result = validateUserData({
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      });
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include('Please enter a valid email address');
    });

    it('should return invalid for short password', function() {
      const result = validateUserData({
        username: 'testuser',
        email: 'test@example.com',
        password: '123'
      });
      expect(result.isValid).to.be.false;
      expect(result.errors).to.include('Password must be at least 6 characters long');
    });

    it('should return multiple errors for multiple invalid fields', function() {
      const result = validateUserData({
        username: 'ab',
        email: 'invalid',
        password: '12'
      });
      expect(result.isValid).to.be.false;
      expect(result.errors).to.have.lengthOf(3);
    });

  });

});
