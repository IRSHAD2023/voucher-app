const express = require('express');
const router = express.Router();

// Show login page
router.get('/login', (req, res) => {
  res.render('login', { error: null }); // Pass an empty error object on initial load
});

// Handle login form submission
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple username and password check (replace with database check if needed)
  if (username === 'admin' && password === 'password') {
    req.session.user = username;
    res.redirect('/dashboard'); // Redirect to dashboard if login is successful
  } else {
    res.render('login', { error: 'Invalid username or password' }); // Display error message
  }
});

module.exports = router;
