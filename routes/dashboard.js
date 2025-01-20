const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Protect dashboard route with authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/auth/login'); // Redirect to login page if not authenticated
  }
};

// Dashboard route
router.get('/', isAuthenticated, (req, res) => {
  const query = 'SELECT * FROM vouchers ORDER BY generated_date DESC'; // Fetch all vouchers
  db.query(query)
    .then(result => {
      res.render('dashboard', {
        user: req.session.user,  // Pass user session data to dashboard
        vouchers: result.rows,
        message: null,
        qrCodeUrl: null,
        voucherCode: null,
        generatedDate: null,
        expiryDate: null,
      });
    })
    .catch(err => {
      res.send('Error fetching vouchers');
    });
});

module.exports = router;
