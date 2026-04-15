const express = require('express');
const router = express.Router();

/**
 * @route   GET /
 * @desc    Render login page
 * @access  Public
 */
router.get('/', (req, res) => {
  res.render('login', { 
    title: 'Login',
    error: null,
    success: null
  });
});

/**
 * @route   GET /signup
 * @desc    Render signup page
 * @access  Public
 */
router.get('/signup', (req, res) => {
  res.render('signup', { 
    title: 'Sign Up',
    error: null,
    success: null
  });
});

/**
 * @route   GET /dashboard
 * @desc    Render dashboard page
 * @access  Public (would be protected in production)
 */
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { 
    title: 'Dashboard',
    username: 'User'
  });
});

module.exports = router;
